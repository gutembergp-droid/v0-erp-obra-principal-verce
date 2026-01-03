"use client"

import { AppLayout } from "@/components/layout/app-layout"
import { Header } from "@/components/layout/header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DollarSign, FileText, CheckCircle2, Clock, Send, Eye, TrendingUp, Calendar, Receipt } from "lucide-react"

// Dados mockados de faturamento
const faturamentoMock = [
  {
    id: 1,
    numero: "NF-2026/001",
    competencia: "Janeiro/2026",
    valorBruto: 3079500,
    retencoes: 184770,
    valorLiquido: 2894730,
    dataEmissao: "2026-02-05",
    dataVencimento: "2026-03-05",
    status: "pendente",
  },
  {
    id: 2,
    numero: "NF-2025/012",
    competencia: "Dezembro/2025",
    valorBruto: 4250000,
    retencoes: 255000,
    valorLiquido: 3995000,
    dataEmissao: "2026-01-05",
    dataVencimento: "2026-02-05",
    status: "pago",
  },
  {
    id: 3,
    numero: "NF-2025/011",
    competencia: "Novembro/2025",
    valorBruto: 3800000,
    retencoes: 228000,
    valorLiquido: 3572000,
    dataEmissao: "2025-12-05",
    dataVencimento: "2026-01-05",
    status: "pago",
  },
]

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("pt-BR")
}

export default function FaturamentoPage() {
  const totalFaturado = faturamentoMock.reduce((acc, item) => acc + item.valorBruto, 0)
  const totalPago = faturamentoMock.filter((f) => f.status === "pago").reduce((acc, item) => acc + item.valorLiquido, 0)
  const totalPendente = faturamentoMock
    .filter((f) => f.status === "pendente")
    .reduce((acc, item) => acc + item.valorLiquido, 0)

  return (
    <AppLayout>
      <Header title="Faturamento" description="Gestão de notas fiscais e faturamento baseado em MC aprovada" />

      <div className="p-6 space-y-6">
        {/* Info */}
        <Card className="border-green-500/20 bg-green-500/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-green-500/10">
                <Receipt className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <h3 className="font-semibold">Faturamento</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  O faturamento é baseado na <strong>Medição do Cliente (MC) aprovada</strong>. Inclui controle de notas
                  fiscais, retenções e vencimentos.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Faturado</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(totalFaturado)}</div>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-green-500" />
                Acumulado do contrato
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Recebido</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{formatCurrency(totalPago)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">A Receber</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-500">{formatCurrency(totalPendente)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">MC Pendente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">1</div>
              <p className="text-xs text-muted-foreground mt-1">Aguardando aprovação</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabela */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">Notas Fiscais</CardTitle>
                <CardDescription>Histórico de faturamento da obra</CardDescription>
              </div>
              <Button>
                <DollarSign className="w-4 h-4 mr-2" />
                Gerar Nova NF
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Número</TableHead>
                  <TableHead>Competência</TableHead>
                  <TableHead className="text-right">Valor Bruto</TableHead>
                  <TableHead className="text-right">Retenções</TableHead>
                  <TableHead className="text-right">Valor Líquido</TableHead>
                  <TableHead>Emissão</TableHead>
                  <TableHead>Vencimento</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {faturamentoMock.map((nf) => (
                  <TableRow key={nf.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <span className="font-mono font-medium">{nf.numero}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        {nf.competencia}
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-mono">{formatCurrency(nf.valorBruto)}</TableCell>
                    <TableCell className="text-right font-mono text-muted-foreground">
                      -{formatCurrency(nf.retencoes)}
                    </TableCell>
                    <TableCell className="text-right font-mono font-bold text-green-600">
                      {formatCurrency(nf.valorLiquido)}
                    </TableCell>
                    <TableCell>{formatDate(nf.dataEmissao)}</TableCell>
                    <TableCell>{formatDate(nf.dataVencimento)}</TableCell>
                    <TableCell className="text-center">
                      {nf.status === "pago" ? (
                        <Badge className="bg-green-500">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Pago
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-amber-500">
                          <Clock className="w-3 h-3 mr-1" />
                          Pendente
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
