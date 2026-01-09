"use client"

import { useState, Suspense } from "react"
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
import {
  ArrowLeft,
  Download,
  Calendar,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  Send,
  FileText,
  History,
  Wallet,
  CreditCard,
} from "lucide-react"
import Link from "next/link"

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
    valor: 124800,
    contaContabil: "3.1.2.01",
    dataPrevista: "01/02/2026",
    status: "provisionado",
  },
  {
    id: 4,
    componente: "Encargos (INSS/FGTS)",
    valor: 356200,
    contaContabil: "3.1.3.01",
    dataPrevista: "20/02/2026",
    status: "pendente",
  },
  {
    id: 5,
    componente: "Bonificações",
    valor: 45000,
    contaContabil: "3.1.1.03",
    dataPrevista: "05/02/2026",
    status: "pendente",
  },
  {
    id: 6,
    componente: "Férias Provisionadas",
    valor: 67800,
    contaContabil: "3.1.4.01",
    dataPrevista: "10/02/2026",
    status: "provisionado",
  },
]

const historicoMock = [
  { data: "08/01/2026 14:30", usuario: "Ana Costa", acao: "Provisão gerada", detalhe: "Competência Janeiro/2026" },
  { data: "08/01/2026 10:15", usuario: "Sistema", acao: "Folha recebida", detalhe: "Valor total: R$ 1.564.300" },
  {
    data: "07/01/2026 16:45",
    usuario: "Carlos Lima",
    acao: "Datas ajustadas",
    detalhe: "Benefícios antecipados para 01/02",
  },
]

function ProvisaoFolhaContent() {
  const [periodo, setPeriodo] = useState("jan-2026")
  const [obra, setObra] = useState("br-101")
  const [showGerarProvisao, setShowGerarProvisao] = useState(false)
  const [showAjustarDatas, setShowAjustarDatas] = useState(false)
  const [showHistorico, setShowHistorico] = useState(false)
  const [componenteSelecionado, setComponenteSelecionado] = useState<(typeof componentesMock)[0] | null>(null)
  const [observacao, setObservacao] = useState("")

  const totalProvisionar = componentesMock.reduce((acc, c) => acc + c.valor, 0)
  const totalProvisionado = componentesMock
    .filter((c) => c.status === "provisionado")
    .reduce((acc, c) => acc + c.valor, 0)
  const totalPendente = totalProvisionar - totalProvisionado

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "provisionado":
        return (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Provisionado</Badge>
        )
      case "pendente":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">Pendente</Badge>
        )
      case "pago":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">Pago</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Link href="/obra/administrativo/financeiro" className="hover:text-foreground">
              Financeiro
            </Link>
            <span>/</span>
            <Link href="/obra/administrativo/financeiro/folha" className="hover:text-foreground">
              Folha
            </Link>
            <span>/</span>
            <span className="text-foreground">Provisão</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/obra/administrativo/financeiro/folha">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold">Provisão de Folha</h1>
                <p className="text-sm text-muted-foreground">
                  Transforma folha recebida em provisão e planejamento de caixa
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
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <Label className="text-sm">Período:</Label>
              <Select value={periodo} onValueChange={setPeriodo}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="jan-2026">Jan/2026</SelectItem>
                  <SelectItem value="dez-2025">Dez/2025</SelectItem>
                  <SelectItem value="nov-2025">Nov/2025</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Label className="text-sm">Obra:</Label>
              <Select value={obra} onValueChange={setObra}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="br-101">BR-101 LOTE 2</SelectItem>
                  <SelectItem value="br-116">BR-116 LOTE 5</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="container py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {/* Total a Provisionar */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Wallet className="h-4 w-4" />
                Total a Provisionar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ {totalProvisionar.toLocaleString("pt-BR")}</div>
              <div className="text-xs text-muted-foreground mt-1">
                <span className="text-green-600">R$ {totalProvisionado.toLocaleString("pt-BR")}</span> provisionado
              </div>
              <div className="text-xs text-muted-foreground">
                <span className="text-yellow-600">R$ {totalPendente.toLocaleString("pt-BR")}</span> pendente
              </div>
            </CardContent>
          </Card>

          {/* Datas-chave */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Datas-chave
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Salários:</span>
                  <span className="font-medium">05/02/2026</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Encargos:</span>
                  <span className="font-medium">20/02/2026</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Benefícios:</span>
                  <span className="font-medium">01/02/2026</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Status de Caixa */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Impacto no Caixa
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-600">-R$ {totalPendente.toLocaleString("pt-BR")}</div>
              <div className="text-xs text-muted-foreground mt-1">Impacto previsto até 20/02</div>
              <Badge className="mt-2 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                Atenção ao fluxo
              </Badge>
            </CardContent>
          </Card>

          {/* Pendências */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Pendências
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{componentesMock.filter((c) => c.status === "pendente").length}</div>
              <div className="text-xs text-muted-foreground mt-1">componentes aguardando provisão</div>
              <div className="text-xs text-blue-600 mt-2 flex items-center gap-1">
                <FileText className="h-3 w-3" />
                Somente leitura - dados de Custos
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabela de Componentes */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Componentes da Folha</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setShowAjustarDatas(true)}>
                  <Calendar className="h-4 w-4 mr-2" />
                  Ajustar Datas
                </Button>
                <Button size="sm" onClick={() => setShowGerarProvisao(true)}>
                  <DollarSign className="h-4 w-4 mr-2" />
                  Gerar Provisão
                </Button>
                <Button variant="secondary" size="sm">
                  <Send className="h-4 w-4 mr-2" />
                  Enviar para Pagamento
                </Button>
              </div>
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
                  <TableRow
                    key={comp.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => setComponenteSelecionado(comp)}
                  >
                    <TableCell className="font-medium">{comp.componente}</TableCell>
                    <TableCell className="text-right font-mono">R$ {comp.valor.toLocaleString("pt-BR")}</TableCell>
                    <TableCell className="text-muted-foreground">{comp.contaContabil}</TableCell>
                    <TableCell>{comp.dataPrevista}</TableCell>
                    <TableCell>{getStatusBadge(comp.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Totais */}
            <div className="flex justify-end mt-4 pt-4 border-t">
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Total da Folha</div>
                <div className="text-xl font-bold">R$ {totalProvisionar.toLocaleString("pt-BR")}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Aviso de governança */}
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-900">
          <div className="flex items-start gap-3">
            <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-800 dark:text-blue-300">Regras de Provisão</p>
              <ul className="text-xs text-blue-700 dark:text-blue-400 mt-1 space-y-1">
                <li>• Provisão NÃO altera valores da folha - apenas agenda no fluxo de caixa</li>
                <li>• Todas as alterações de data são registradas em log de auditoria</li>
                <li>• Envio para pagamento requer todos os componentes provisionados</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Fluxo visual */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Badge variant="outline" className="bg-green-50">
            RH ✓
          </Badge>
          <span>→</span>
          <Badge variant="outline" className="bg-green-50">
            Custos ✓
          </Badge>
          <span>→</span>
          <Badge variant="outline" className="bg-green-50">
            Gerência ✓
          </Badge>
          <span>→</span>
          <Badge className="bg-amber-100 text-amber-800">Financeiro (Provisão)</Badge>
          <span>→</span>
          <Badge variant="outline">Pagamento</Badge>
        </div>
      </div>

      {/* Dialog Gerar Provisão */}
      <Dialog open={showGerarProvisao} onOpenChange={setShowGerarProvisao}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Gerar Provisão</DialogTitle>
            <DialogDescription>Confirme a geração de provisão para os componentes pendentes.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-sm font-medium mb-2">Componentes a provisionar:</div>
              <ul className="text-sm space-y-1">
                {componentesMock
                  .filter((c) => c.status === "pendente")
                  .map((c) => (
                    <li key={c.id} className="flex justify-between">
                      <span>{c.componente}</span>
                      <span className="font-mono">R$ {c.valor.toLocaleString("pt-BR")}</span>
                    </li>
                  ))}
              </ul>
              <div className="border-t mt-2 pt-2 flex justify-between font-bold">
                <span>Total</span>
                <span>R$ {totalPendente.toLocaleString("pt-BR")}</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Observação (opcional)</Label>
              <Textarea
                placeholder="Registre observações sobre esta provisão..."
                value={observacao}
                onChange={(e) => setObservacao(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowGerarProvisao(false)}>
              Cancelar
            </Button>
            <Button onClick={() => setShowGerarProvisao(false)}>
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Confirmar Provisão
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog Ajustar Datas */}
      <Dialog open={showAjustarDatas} onOpenChange={setShowAjustarDatas}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajustar Datas de Pagamento</DialogTitle>
            <DialogDescription>Altere as datas previstas para pagamento dos componentes.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {componentesMock.map((comp) => (
              <div key={comp.id} className="flex items-center justify-between gap-4">
                <span className="text-sm flex-1">{comp.componente}</span>
                <Input type="date" className="w-[160px]" defaultValue="2026-02-05" />
              </div>
            ))}
            <div className="space-y-2">
              <Label>Justificativa (obrigatória)</Label>
              <Textarea placeholder="Informe o motivo do ajuste de datas..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAjustarDatas(false)}>
              Cancelar
            </Button>
            <Button onClick={() => setShowAjustarDatas(false)}>Salvar Alterações</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Sheet Histórico */}
      <Sheet open={showHistorico} onOpenChange={setShowHistorico}>
        <SheetContent className="w-[500px]">
          <SheetHeader>
            <SheetTitle>Histórico de Provisão</SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-4">
            {historicoMock.map((h, i) => (
              <div key={i} className="flex gap-3 pb-4 border-b last:border-0">
                <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">{h.acao}</span>
                    <span className="text-xs text-muted-foreground">{h.data}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{h.detalhe}</p>
                  <p className="text-xs text-muted-foreground">por {h.usuario}</p>
                </div>
              </div>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default function ProvisaoFolhaPage() {
  return (
    <Suspense fallback={null}>
      <ProvisaoFolhaContent />
    </Suspense>
  )
}
