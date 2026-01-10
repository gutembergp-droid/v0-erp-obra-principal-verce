"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DollarSign,
  Download,
  CheckCircle2,
  Clock,
  ArrowRight,
  Eye,
  FileText,
  AlertTriangle,
  Landmark,
  Receipt,
  Calculator,
} from "lucide-react"

// Status de cada obra
const statusObrasMock = [
  {
    id: 1,
    obra: "Obra Centro Comercial",
    codigo: "OBR-001",
    status: "aprovada",
    totalFolha: 485000,
    colaboradores: 87,
    dataEnvio: "05/01/2026",
    dataAprovacao: "07/01/2026",
  },
  {
    id: 2,
    obra: "Obra Residencial Sul",
    codigo: "OBR-002",
    status: "aprovada",
    totalFolha: 320000,
    colaboradores: 54,
    dataEnvio: "04/01/2026",
    dataAprovacao: "06/01/2026",
  },
  {
    id: 3,
    obra: "Obra Industrial Norte",
    codigo: "OBR-003",
    status: "em_analise",
    totalFolha: 215000,
    colaboradores: 38,
    dataEnvio: "06/01/2026",
    dataAprovacao: null,
  },
  {
    id: 4,
    obra: "Corporativo",
    codigo: "CORP",
    status: "aprovada",
    totalFolha: 93950,
    colaboradores: 4,
    dataEnvio: "05/01/2026",
    dataAprovacao: "07/01/2026",
  },
]

export function PagamentoContent() {
  const [activeTab, setActiveTab] = useState("recebimento")
  const [selectedObra, setSelectedObra] = useState<(typeof statusObrasMock)[0] | null>(null)
  const [showPagamentoDialog, setShowPagamentoDialog] = useState(false)
  const [showProvisaoDialog, setShowProvisaoDialog] = useState(false)

  const totalGeral = statusObrasMock.reduce((acc, o) => acc + o.totalFolha, 0)
  const totalColaboradores = statusObrasMock.reduce((acc, o) => acc + o.colaboradores, 0)
  const obrasAprovadas = statusObrasMock.filter((o) => o.status === "aprovada").length
  const obrasPendentes = statusObrasMock.filter((o) => o.status !== "aprovada").length

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "aprovada":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Aprovada
          </Badge>
        )
      case "em_analise":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            Em Analise
          </Badge>
        )
      case "pendente":
        return <Badge variant="secondary">Pendente</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Cards Resumo */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total a Pagar</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {totalGeral.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{totalColaboradores} colaboradores</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Obras Aprovadas</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{obrasAprovadas}</div>
            <p className="text-xs text-muted-foreground">de {statusObrasMock.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
            <Clock className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{obrasPendentes}</div>
            <p className="text-xs text-muted-foreground">aguardando aprovacao</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Data Pagamento</CardTitle>
            <Landmark className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10/01</div>
            <p className="text-xs text-muted-foreground">Previsao</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="recebimento" className="flex items-center gap-2">
            <Receipt className="h-4 w-4" />
            Recebimento das Obras
          </TabsTrigger>
          <TabsTrigger value="provisao" className="flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            Provisao
          </TabsTrigger>
          <TabsTrigger value="pagamento" className="flex items-center gap-2">
            <Landmark className="h-4 w-4" />
            Pagamento
          </TabsTrigger>
        </TabsList>

        {/* Tab Recebimento */}
        <TabsContent value="recebimento" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Status das Obras</CardTitle>
              <CardDescription>Acompanhe o status de fechamento de cada obra</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Obra</TableHead>
                    <TableHead>Codigo</TableHead>
                    <TableHead>Colaboradores</TableHead>
                    <TableHead className="text-right">Total Folha</TableHead>
                    <TableHead>Data Envio</TableHead>
                    <TableHead>Data Aprovacao</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Acoes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {statusObrasMock.map((obra) => (
                    <TableRow key={obra.id}>
                      <TableCell className="font-medium">{obra.obra}</TableCell>
                      <TableCell className="font-mono text-sm">{obra.codigo}</TableCell>
                      <TableCell>{obra.colaboradores}</TableCell>
                      <TableCell className="text-right font-bold">R$ {obra.totalFolha.toLocaleString()}</TableCell>
                      <TableCell>{obra.dataEnvio}</TableCell>
                      <TableCell>{obra.dataAprovacao || "-"}</TableCell>
                      <TableCell>{getStatusBadge(obra.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => setSelectedObra(obra)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Provisao */}
        <TabsContent value="provisao" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Provisao Contabil</CardTitle>
              <CardDescription>Gere a provisao para lancamento contabil</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Total Bruto</p>
                    <p className="text-2xl font-bold">R$ {totalGeral.toLocaleString()}</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Encargos Estimados</p>
                    <p className="text-2xl font-bold">R$ {Math.round(totalGeral * 0.4).toLocaleString()}</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Total Provisao</p>
                    <p className="text-2xl font-bold">R$ {Math.round(totalGeral * 1.4).toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button onClick={() => setShowProvisaoDialog(true)}>
                    <FileText className="h-4 w-4 mr-2" />
                    Gerar Provisao
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Pagamento */}
        <TabsContent value="pagamento" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pagamento Bancario</CardTitle>
              <CardDescription>Gere o arquivo de pagamento para o banco</CardDescription>
            </CardHeader>
            <CardContent>
              {obrasPendentes > 0 ? (
                <div className="p-6 text-center border rounded-lg border-dashed">
                  <AlertTriangle className="h-12 w-12 text-amber-600 mx-auto mb-4" />
                  <h3 className="font-medium mb-2">Aguardando Aprovacoes</h3>
                  <p className="text-muted-foreground">
                    Ainda existem {obrasPendentes} obra(s) pendente(s) de aprovacao. O pagamento so pode ser gerado apos
                    todas as aprovacoes.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-700">Total Liquido</p>
                      <p className="text-2xl font-bold text-green-700">
                        R$ {Math.round(totalGeral * 0.6).toLocaleString()}
                      </p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Colaboradores</p>
                      <p className="text-2xl font-bold">{totalColaboradores}</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Data Prevista</p>
                      <p className="text-2xl font-bold">10/01/2026</p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button onClick={() => setShowPagamentoDialog(true)}>
                      <Landmark className="h-4 w-4 mr-2" />
                      Gerar Arquivo Bancario
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Rodape - Fluxo Consolidado */}
      <Card className="bg-muted/50">
        <CardContent className="py-3">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Fluxo Consolidado:</span>
            <span>Obras enviam</span>
            <ArrowRight className="h-4 w-4" />
            <span>Corporativo recebe</span>
            <ArrowRight className="h-4 w-4" />
            <span>Gera provisao</span>
            <ArrowRight className="h-4 w-4" />
            <span>Paga banco</span>
          </div>
        </CardContent>
      </Card>

      {/* Sheet Detalhe Obra */}
      <Sheet open={!!selectedObra} onOpenChange={() => setSelectedObra(null)}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{selectedObra?.obra}</SheetTitle>
            <SheetDescription>Detalhe da folha</SheetDescription>
          </SheetHeader>
          {selectedObra && (
            <div className="mt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Codigo</p>
                  <p className="font-medium">{selectedObra.codigo}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Colaboradores</p>
                  <p className="font-medium">{selectedObra.colaboradores}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Folha</p>
                  <p className="font-medium">R$ {selectedObra.totalFolha.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  {getStatusBadge(selectedObra.status)}
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Dialog Pagamento */}
      <Dialog open={showPagamentoDialog} onOpenChange={setShowPagamentoDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Gerar Arquivo Bancario</DialogTitle>
            <DialogDescription>O arquivo sera gerado para envio ao banco</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Observacoes (opcional)</p>
              <Textarea placeholder="Adicione observacoes..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPagamentoDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={() => setShowPagamentoDialog(false)}>Gerar Arquivo</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog Provisao */}
      <Dialog open={showProvisaoDialog} onOpenChange={setShowProvisaoDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Gerar Provisao Contabil</DialogTitle>
            <DialogDescription>A provisao sera gerada para lancamento</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Observacoes (opcional)</p>
              <Textarea placeholder="Adicione observacoes..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowProvisaoDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={() => setShowProvisaoDialog(false)}>Gerar Provisao</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
