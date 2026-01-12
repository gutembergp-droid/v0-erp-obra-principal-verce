"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import {
  TrendingUp,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  AlertTriangle,
  Plus,
  Download,
  RefreshCw,
  Eye,
  MoreHorizontal,
  Banknote,
  Building,
  ArrowLeftRight,
} from "lucide-react"
import { ResponsiveContainer, Tooltip as RechartsTooltip, PieChart, Pie, Cell, Tooltip } from "recharts"
import { FinanceiroNavbar } from "../_components/financeiro-navbar"
import { usePathname } from "next/navigation"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@radix-ui/react-scroll-area"

// Contas Bancarias Corporativas
const contasBancarias = [
  {
    id: 1,
    banco: "Banco do Brasil",
    agencia: "1234-5",
    conta: "12345-6",
    tipo: "Corrente",
    saldo: 5850000,
    saldoD1: 5720000,
    bloqueado: 150000,
    aplicacoes: 2500000,
    limiteChequeEspecial: 1000000,
    utilizadoChequeEspecial: 0,
    cor: "hsl(45, 100%, 45%)",
  },
  {
    id: 2,
    banco: "Itau",
    agencia: "0001",
    conta: "78901-2",
    tipo: "Corrente",
    saldo: 3200000,
    saldoD1: 3150000,
    bloqueado: 50000,
    aplicacoes: 1000000,
    limiteChequeEspecial: 500000,
    utilizadoChequeEspecial: 0,
    cor: "hsl(25, 100%, 50%)",
  },
  {
    id: 3,
    banco: "Bradesco",
    agencia: "2345",
    conta: "34567-8",
    tipo: "Corrente",
    saldo: 2180000,
    saldoD1: 2100000,
    bloqueado: 30000,
    aplicacoes: 500000,
    limiteChequeEspecial: 300000,
    utilizadoChequeEspecial: 0,
    cor: "hsl(0, 70%, 50%)",
  },
  {
    id: 4,
    banco: "Santander",
    agencia: "3456",
    conta: "45678-9",
    tipo: "Corrente",
    saldo: 1350000,
    saldoD1: 1320000,
    bloqueado: 0,
    aplicacoes: 0,
    limiteChequeEspecial: 200000,
    utilizadoChequeEspecial: 0,
    cor: "hsl(0, 100%, 40%)",
  },
]

const movimentacoesDia = [
  { id: 1, tipo: "entrada", descricao: "TED Recebido - DNIT", valor: 450000, conta: "Banco do Brasil", hora: "09:15" },
  { id: 2, tipo: "saida", descricao: "Pagamento Folha - BR-101", valor: 380000, conta: "Itau", hora: "10:30" },
  { id: 3, tipo: "entrada", descricao: "Medicao #12 - Furnas", valor: 280000, conta: "Bradesco", hora: "11:45" },
  { id: 4, tipo: "saida", descricao: "Fornecedor ConstruMat", valor: 125000, conta: "Banco do Brasil", hora: "14:20" },
  {
    id: 5,
    tipo: "transferencia",
    descricao: "Transferencia entre contas",
    valor: 200000,
    conta: "Itau → BB",
    hora: "15:00",
  },
  { id: 6, tipo: "saida", descricao: "Impostos FGTS", valor: 95000, conta: "Santander", hora: "16:30" },
]

const borderosPendentes = [
  { id: "BRD-001", data: "09/01", qtdTitulos: 12, valor: 485000, banco: "Banco do Brasil", status: "aguardando" },
  { id: "BRD-002", data: "09/01", qtdTitulos: 8, valor: 320000, banco: "Itau", status: "aguardando" },
  { id: "BRD-003", data: "10/01", qtdTitulos: 15, valor: 650000, banco: "Banco do Brasil", status: "programado" },
]

const aplicacoesFinanceiras = [
  { id: 1, tipo: "CDB", banco: "Banco do Brasil", valor: 2500000, taxa: "102% CDI", vencimento: "15/03/2026" },
  { id: 2, tipo: "CDB", banco: "Itau", valor: 1000000, taxa: "100% CDI", vencimento: "30/04/2026" },
  { id: 3, tipo: "LCA", banco: "Bradesco", valor: 500000, taxa: "95% CDI", vencimento: "20/02/2026" },
]

const saldoPorObra = [
  { obra: "BR-101 Lote 3", bb: 2500000, itau: 1200000, bradesco: 800000, santander: 350000 },
  { obra: "SES Metro Sul", bb: 1800000, itau: 1000000, bradesco: 600000, santander: 400000 },
  { obra: "UHE Belo Monte", bb: 1200000, itau: 700000, bradesco: 500000, santander: 380000 },
  { obra: "Restauro SP-330", bb: 350000, itau: 300000, bradesco: 280000, santander: 220000 },
]

export default function TesourariaPage() {
  const pathname = usePathname()
  const [searchTerm, setSearchTerm] = useState("")
  const [contaSelecionada, setContaSelecionada] = useState<(typeof contasBancarias)[0] | null>(null)

  const formatCurrency = (value: number) => {
    if (value >= 1000000) return `R$ ${(value / 1000000).toFixed(2)} Mi`
    if (value >= 1000) return `R$ ${(value / 1000).toFixed(0)} K`
    return `R$ ${value.toLocaleString("pt-BR")}`
  }

  const saldoTotal = contasBancarias.reduce((acc, c) => acc + c.saldo, 0)
  const aplicacoesTotal = contasBancarias.reduce((acc, c) => acc + c.aplicacoes, 0)
  const bloqueadoTotal = contasBancarias.reduce((acc, c) => acc + c.bloqueado, 0)
  const disponivelTotal = saldoTotal - bloqueadoTotal

  return (
    <div className="flex flex-col h-screen bg-muted/30 overflow-hidden">
      <div className="flex-shrink-0 z-40 mt-0">
        <FinanceiroNavbar />
      </div>
      <main className="flex-1 bg-background overflow-hidden p-6">
        <div
          className="h-full border-0 bg-background overflow-y-auto overflow-x-hidden scrollbar-hide p-6"
          style={{
            borderRadius: '25px',
            boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.13), 0 2px 8px rgba(0, 0, 0, 0.05)',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Button variant="outline" size="sm" className="h-7 text-xs gap-1 bg-transparent">
                <RefreshCw className="w-3.5 h-3.5" />
                Atualizar Saldos
              </Button>
              <Button variant="outline" size="sm" className="h-7 text-xs gap-1 bg-transparent">
                <Download className="w-3.5 h-3.5" />
                Extrato
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" className="h-7 text-xs gap-1 bg-emerald-600 hover:bg-emerald-700">
                    <Plus className="w-3.5 h-3.5" />
                    Nova Transferencia
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Nova Transferencia entre Contas</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-medium">Conta Origem</label>
                        <Select>
                          <SelectTrigger className="h-9 text-xs">
                            <SelectValue placeholder="Selecione..." />
                          </SelectTrigger>
                          <SelectContent>
                            {contasBancarias.map((c) => (
                              <SelectItem key={c.id} value={c.id.toString()} className="text-xs">
                                {c.banco} - {c.conta}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-medium">Conta Destino</label>
                        <Select>
                          <SelectTrigger className="h-9 text-xs">
                            <SelectValue placeholder="Selecione..." />
                          </SelectTrigger>
                          <SelectContent>
                            {contasBancarias.map((c) => (
                              <SelectItem key={c.id} value={c.id.toString()} className="text-xs">
                                {c.banco} - {c.conta}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-medium">Valor</label>
                      <Input type="number" placeholder="R$ 0,00" className="h-9 text-xs" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-medium">Descricao</label>
                      <Input placeholder="Motivo da transferencia..." className="h-9 text-xs" />
                    </div>
                    <div className="flex justify-end gap-2 pt-4">
                      <Button variant="outline" size="sm">
                        Cancelar
                      </Button>
                      <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                        Confirmar
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Conteudo */}
          <main className="flex-1 overflow-auto p-4">
            <div className="max-w-[1600px] mx-auto space-y-4">
              {/* Resumo Tesouraria */}
              <div className="grid grid-cols-5 gap-3">
                <Card className="p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-bold text-emerald-600">{formatCurrency(saldoTotal)}</p>
                      <p className="text-[10px] text-muted-foreground">Saldo Total</p>
                    </div>
                    <Wallet className="w-5 h-5 text-emerald-600" />
                  </div>
                </Card>
                <Card className="p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-bold">{formatCurrency(disponivelTotal)}</p>
                      <p className="text-[10px] text-muted-foreground">Disponivel</p>
                    </div>
                    <Banknote className="w-5 h-5 text-blue-600" />
                  </div>
                </Card>
                <Card className="p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-bold text-amber-600">{formatCurrency(bloqueadoTotal)}</p>
                      <p className="text-[10px] text-muted-foreground">Bloqueado</p>
                    </div>
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                  </div>
                </Card>
                <Card className="p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-bold text-purple-600">{formatCurrency(aplicacoesTotal)}</p>
                      <p className="text-[10px] text-muted-foreground">Aplicacoes</p>
                    </div>
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                  </div>
                </Card>
                <Card className="p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-bold">{contasBancarias.length}</p>
                      <p className="text-[10px] text-muted-foreground">Contas Ativas</p>
                    </div>
                    <Building className="w-5 h-5 text-gray-600" />
                  </div>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Contas Bancarias */}
                <Card className="lg:col-span-2">
                  <CardHeader className="py-3 px-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium">Posicao Bancaria</CardTitle>
                      <Badge variant="outline" className="text-[10px]">
                        Atualizado: 09/01 16:45
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow className="hover:bg-transparent">
                          <TableHead className="text-[10px] h-8">Banco</TableHead>
                          <TableHead className="text-[10px] h-8">Ag/Conta</TableHead>
                          <TableHead className="text-[10px] h-8 text-right">Saldo</TableHead>
                          <TableHead className="text-[10px] h-8 text-right">Bloqueado</TableHead>
                          <TableHead className="text-[10px] h-8 text-right">Aplicacoes</TableHead>
                          <TableHead className="text-[10px] h-8 text-right">Disponivel</TableHead>
                          <TableHead className="text-[10px] h-8 w-8"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {contasBancarias.map((conta) => (
                          <TableRow
                            key={conta.id}
                            className="cursor-pointer hover:bg-muted/50"
                            onClick={() => setContaSelecionada(conta)}
                          >
                            <TableCell className="py-2">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: conta.cor }} />
                                <span className="text-xs font-medium">{conta.banco}</span>
                              </div>
                            </TableCell>
                            <TableCell className="py-2 text-xs text-muted-foreground">
                              {conta.agencia} / {conta.conta}
                            </TableCell>
                            <TableCell className="py-2 text-xs text-right font-medium">
                              {formatCurrency(conta.saldo)}
                            </TableCell>
                            <TableCell className="py-2 text-xs text-right text-amber-600">
                              {conta.bloqueado > 0 ? formatCurrency(conta.bloqueado) : "-"}
                            </TableCell>
                            <TableCell className="py-2 text-xs text-right text-purple-600">
                              {conta.aplicacoes > 0 ? formatCurrency(conta.aplicacoes) : "-"}
                            </TableCell>
                            <TableCell className="py-2 text-xs text-right font-bold text-emerald-600">
                              {formatCurrency(conta.saldo - conta.bloqueado)}
                            </TableCell>
                            <TableCell className="py-2">
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <Eye className="w-3.5 h-3.5" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <div className="p-3 border-t bg-muted/30">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium">Total Consolidado</span>
                        <span className="text-sm font-bold text-emerald-600">{formatCurrency(saldoTotal)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Distribuicao */}
                <Card>
                  <CardHeader className="py-3 px-4">
                    <CardTitle className="text-sm font-medium">Distribuicao por Banco</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="h-[160px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={contasBancarias}
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={65}
                            dataKey="saldo"
                            nameKey="banco"
                          >
                            {contasBancarias.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.cor} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value: number) => formatCurrency(value)} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="space-y-2 mt-2">
                      {contasBancarias.map((conta) => (
                        <div key={conta.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: conta.cor }} />
                            <span className="text-xs">{conta.banco}</span>
                          </div>
                          <span className="text-xs font-medium">{((conta.saldo / saldoTotal) * 100).toFixed(1)}%</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Movimentacoes do Dia */}
                <Card className="lg:col-span-2">
                  <CardHeader className="py-3 px-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium">Movimentacoes de Hoje</CardTitle>
                      <Badge variant="outline" className="text-[10px]">
                        {movimentacoesDia.length} movimentos
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ScrollArea className="h-[220px]">
                      <Table>
                        <TableHeader>
                          <TableRow className="hover:bg-transparent">
                            <TableHead className="text-[10px] h-8 w-16">Hora</TableHead>
                            <TableHead className="text-[10px] h-8">Descricao</TableHead>
                            <TableHead className="text-[10px] h-8">Conta</TableHead>
                            <TableHead className="text-[10px] h-8 text-right">Valor</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {movimentacoesDia.map((mov) => (
                            <TableRow key={mov.id}>
                              <TableCell className="py-2 text-xs text-muted-foreground">{mov.hora}</TableCell>
                              <TableCell className="py-2">
                                <div className="flex items-center gap-2">
                                  {mov.tipo === "entrada" && <ArrowDownRight className="w-3.5 h-3.5 text-green-500" />}
                                  {mov.tipo === "saida" && <ArrowUpRight className="w-3.5 h-3.5 text-red-500" />}
                                  {mov.tipo === "transferencia" && (
                                    <ArrowLeftRight className="w-3.5 h-3.5 text-blue-500" />
                                  )}
                                  <span className="text-xs">{mov.descricao}</span>
                                </div>
                              </TableCell>
                              <TableCell className="py-2 text-xs text-muted-foreground">{mov.conta}</TableCell>
                              <TableCell
                                className={cn(
                                  "py-2 text-xs text-right font-medium",
                                  mov.tipo === "entrada"
                                    ? "text-green-600"
                                    : mov.tipo === "saida"
                                      ? "text-red-600"
                                      : "text-blue-600",
                                )}
                              >
                                {mov.tipo === "entrada" ? "+" : mov.tipo === "saida" ? "-" : ""}
                                {formatCurrency(mov.valor)}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </ScrollArea>
                  </CardContent>
                </Card>

                {/* Borderos Pendentes */}
                <Card>
                  <CardHeader className="py-3 px-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium">Borderos Pendentes</CardTitle>
                      <Button variant="ghost" size="sm" className="h-6 text-[10px] px-2">
                        Ver todos
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {borderosPendentes.map((bordero) => (
                        <div key={bordero.id} className="p-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-medium">{bordero.id}</span>
                            <Badge
                              variant={bordero.status === "aguardando" ? "destructive" : "secondary"}
                              className="text-[9px] h-4"
                            >
                              {bordero.status === "aguardando" ? "Aguardando" : "Programado"}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-1">
                            <span>{bordero.banco}</span>
                            <span>{bordero.qtdTitulos} titulos</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] text-muted-foreground">{bordero.data}</span>
                            <span className="text-xs font-bold">{formatCurrency(bordero.valor)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Aplicacoes Financeiras */}
              <Card>
                <CardHeader className="py-3 px-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">Aplicacoes Financeiras</CardTitle>
                    <Button variant="outline" size="sm" className="h-7 text-xs gap-1 bg-transparent">
                      <Plus className="w-3.5 h-3.5" />
                      Nova Aplicacao
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="text-[10px] h-8">Tipo</TableHead>
                        <TableHead className="text-[10px] h-8">Banco</TableHead>
                        <TableHead className="text-[10px] h-8 text-right">Valor Aplicado</TableHead>
                        <TableHead className="text-[10px] h-8 text-center">Taxa</TableHead>
                        <TableHead className="text-[10px] h-8 text-center">Vencimento</TableHead>
                        <TableHead className="text-[10px] h-8 w-8"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {aplicacoesFinanceiras.map((app) => (
                        <TableRow key={app.id}>
                          <TableCell className="py-2">
                            <Badge variant="outline" className="text-[10px]">
                              {app.tipo}
                            </Badge>
                          </TableCell>
                          <TableCell className="py-2 text-xs">{app.banco}</TableCell>
                          <TableCell className="py-2 text-xs text-right font-medium text-purple-600">
                            {formatCurrency(app.valor)}
                          </TableCell>
                          <TableCell className="py-2 text-xs text-center">{app.taxa}</TableCell>
                          <TableCell className="py-2 text-xs text-center text-muted-foreground">
                            {app.vencimento}
                          </TableCell>
                          <TableCell className="py-2">
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <MoreHorizontal className="w-3.5 h-3.5" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <div className="p-3 border-t bg-muted/30">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium">Total em Aplicacoes</span>
                      <span className="text-sm font-bold text-purple-600">{formatCurrency(aplicacoesTotal)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </main>
    </div>
  )
}
