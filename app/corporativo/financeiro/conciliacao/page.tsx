"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import {
  Search,
  Download,
  Upload,
  RefreshCw,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Link2,
  Unlink,
  FileText,
  Building2,
} from "lucide-react"
import { FinanceiroNavbar } from "../_components/financeiro-navbar"

// Dados mockados
const resumoConciliacao = {
  totalExtrato: 1250000,
  totalSistema: 1235000,
  diferenca: 15000,
  conciliados: 342,
  pendentes: 18,
  divergentes: 5,
}

const contasBancarias = [
  { id: "1", banco: "Bradesco", agencia: "1234", conta: "56789-0", saldo: 450000, conciliado: true },
  { id: "2", banco: "Itau", agencia: "5678", conta: "12345-6", saldo: 380000, conciliado: true },
  { id: "3", banco: "Santander", agencia: "9012", conta: "78901-2", saldo: 280000, conciliado: false },
  { id: "4", banco: "Caixa", agencia: "3456", conta: "23456-7", saldo: 140000, conciliado: true },
]

const lancamentosExtrato = [
  {
    id: "1",
    data: "2025-01-08",
    descricao: "TED RECEBIDA - CONSTRUTORA ALFA",
    valor: 150000,
    tipo: "credito",
    status: "conciliado",
    vinculo: "NF-2024-0089",
  },
  {
    id: "2",
    data: "2025-01-08",
    descricao: "PAG FORNECEDOR - ARGAMASSA LTDA",
    valor: -25000,
    tipo: "debito",
    status: "conciliado",
    vinculo: "PED-2024-0234",
  },
  {
    id: "3",
    data: "2025-01-07",
    descricao: "TED ENVIADA - FOLHA PAGAMENTO",
    valor: -180000,
    tipo: "debito",
    status: "conciliado",
    vinculo: "FOLHA-01/2025",
  },
  {
    id: "4",
    data: "2025-01-07",
    descricao: "DOC RECEBIDO - CLIENTE XYZ",
    valor: 85000,
    tipo: "credito",
    status: "pendente",
    vinculo: null,
  },
  {
    id: "5",
    data: "2025-01-06",
    descricao: "TARIFA BANCARIA",
    valor: -150,
    tipo: "debito",
    status: "divergente",
    vinculo: null,
  },
  {
    id: "6",
    data: "2025-01-06",
    descricao: "TED RECEBIDA - MEDICAO OBRA 003",
    valor: 320000,
    tipo: "credito",
    status: "conciliado",
    vinculo: "NF-2024-0091",
  },
  {
    id: "7",
    data: "2025-01-05",
    descricao: "PAG BOLETO - ENERGIA ELETRICA",
    valor: -8500,
    tipo: "debito",
    status: "pendente",
    vinculo: null,
  },
  {
    id: "8",
    data: "2025-01-05",
    descricao: "ESTORNO - DUPLICIDADE",
    valor: 2500,
    tipo: "credito",
    status: "divergente",
    vinculo: null,
  },
]

const lancamentosSistema = [
  {
    id: "S1",
    data: "2025-01-08",
    descricao: "Recebimento NF-2024-0089 - Construtora Alfa",
    valor: 150000,
    tipo: "credito",
    conciliado: true,
  },
  {
    id: "S2",
    data: "2025-01-08",
    descricao: "Pagamento PED-2024-0234 - Argamassa Ltda",
    valor: 25000,
    tipo: "debito",
    conciliado: true,
  },
  {
    id: "S3",
    data: "2025-01-07",
    descricao: "Folha de Pagamento 01/2025",
    valor: 180000,
    tipo: "debito",
    conciliado: true,
  },
  {
    id: "S4",
    data: "2025-01-06",
    descricao: "Recebimento NF-2024-0091 - Medicao Obra 003",
    valor: 320000,
    tipo: "credito",
    conciliado: true,
  },
  {
    id: "S5",
    data: "2025-01-05",
    descricao: "Pagamento Conta Energia - Obra 001",
    valor: 8500,
    tipo: "debito",
    conciliado: false,
  },
  {
    id: "S6",
    data: "2025-01-04",
    descricao: "Recebimento NF-2024-0088 - Cliente ABC",
    valor: 85000,
    tipo: "credito",
    conciliado: false,
  },
]

export default function ConciliacaoPage() {
  const [contaSelecionada, setContaSelecionada] = useState("1")
  const [filtroStatus, setFiltroStatus] = useState("todos")
  const [busca, setBusca] = useState("")
  const [selecionadosExtrato, setSelecionadosExtrato] = useState<string[]>([])
  const [selecionadosSistema, setSelecionadosSistema] = useState<string[]>([])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "conciliado":
        return (
          <Badge className="bg-green-100 text-green-700">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Conciliado
          </Badge>
        )
      case "pendente":
        return (
          <Badge className="bg-amber-100 text-amber-700">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Pendente
          </Badge>
        )
      case "divergente":
        return (
          <Badge className="bg-red-100 text-red-700">
            <XCircle className="h-3 w-3 mr-1" />
            Divergente
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const toggleSelecionadoExtrato = (id: string) => {
    setSelecionadosExtrato((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  const toggleSelecionadoSistema = (id: string) => {
    setSelecionadosSistema((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  const percentualConciliado =
    (resumoConciliacao.conciliados /
      (resumoConciliacao.conciliados + resumoConciliacao.pendentes + resumoConciliacao.divergentes)) *
    100

  return (
    <div className="flex flex-col h-screen bg-muted/30 overflow-hidden">
      <div className="flex-shrink-0 z-40 mt-0">
        <FinanceiroNavbar />
      </div>
      <main className="flex-1 bg-background overflow-hidden p-6">
        <div 
          className="h-full border-0 bg-background overflow-y-auto overflow-x-hidden scrollbar-hide p-6 space-y-6" 
          style={{ 
            borderRadius: '25px', 
            boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.13), 0 2px 8px rgba(0, 0, 0, 0.05)',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Conciliacao Bancaria</h1>
          <p className="text-slate-500">Concilie lancamentos do extrato com o sistema</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Importar OFX
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Atualizar
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wide">Saldo Extrato</p>
                <p className="text-xl font-bold text-slate-900">{formatCurrency(resumoConciliacao.totalExtrato)}</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Building2 className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wide">Saldo Sistema</p>
                <p className="text-xl font-bold text-slate-900">{formatCurrency(resumoConciliacao.totalSistema)}</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                <FileText className="h-5 w-5 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wide">Diferenca</p>
                <p className="text-xl font-bold text-red-600">{formatCurrency(resumoConciliacao.diferenca)}</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-red-100 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wide">% Conciliado</p>
                <p className="text-xl font-bold text-slate-900">{percentualConciliado.toFixed(1)}%</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              </div>
            </div>
            <Progress value={percentualConciliado} className="mt-2 h-1.5" />
          </CardContent>
        </Card>
      </div>

      {/* Selecao de Conta */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Contas Bancarias</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {contasBancarias.map((conta) => (
              <button
                key={conta.id}
                onClick={() => setContaSelecionada(conta.id)}
                className={`flex-shrink-0 p-3 rounded-lg border-2 transition-all ${
                  contaSelecionada === conta.id
                    ? "border-emerald-500 bg-emerald-50"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center ${
                      conta.conciliado ? "bg-green-100" : "bg-amber-100"
                    }`}
                  >
                    {conta.conciliado ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-amber-600" />
                    )}
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-sm text-slate-900">{conta.banco}</p>
                    <p className="text-xs text-slate-500">
                      Ag: {conta.agencia} | CC: {conta.conta}
                    </p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="font-semibold text-sm text-slate-900">{formatCurrency(conta.saldo)}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Area de Conciliacao */}
      <div className="grid grid-cols-2 gap-4">
        {/* Extrato Bancario */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">Extrato Bancario</CardTitle>
                <CardDescription>{lancamentosExtrato.length} lancamentos</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Select value={filtroStatus} onValueChange={setFiltroStatus}>
                  <SelectTrigger className="w-32 h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="pendente">Pendentes</SelectItem>
                    <SelectItem value="divergente">Divergentes</SelectItem>
                    <SelectItem value="conciliado">Conciliados</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-[400px] overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-8"></TableHead>
                    <TableHead className="text-xs">Data</TableHead>
                    <TableHead className="text-xs">Descricao</TableHead>
                    <TableHead className="text-xs text-right">Valor</TableHead>
                    <TableHead className="text-xs">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lancamentosExtrato
                    .filter((l) => filtroStatus === "todos" || l.status === filtroStatus)
                    .map((lancamento) => (
                      <TableRow
                        key={lancamento.id}
                        className={`cursor-pointer ${selecionadosExtrato.includes(lancamento.id) ? "bg-emerald-50" : ""}`}
                      >
                        <TableCell>
                          <Checkbox
                            checked={selecionadosExtrato.includes(lancamento.id)}
                            onCheckedChange={() => toggleSelecionadoExtrato(lancamento.id)}
                            disabled={lancamento.status === "conciliado"}
                          />
                        </TableCell>
                        <TableCell className="text-xs text-slate-600">
                          {new Date(lancamento.data).toLocaleDateString("pt-BR")}
                        </TableCell>
                        <TableCell>
                          <p className="text-xs font-medium text-slate-900 truncate max-w-[150px]">
                            {lancamento.descricao}
                          </p>
                          {lancamento.vinculo && (
                            <p className="text-[10px] text-slate-500 flex items-center gap-1">
                              <Link2 className="h-2.5 w-2.5" />
                              {lancamento.vinculo}
                            </p>
                          )}
                        </TableCell>
                        <TableCell
                          className={`text-xs font-semibold text-right ${
                            lancamento.valor > 0 ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {formatCurrency(Math.abs(lancamento.valor))}
                        </TableCell>
                        <TableCell>{getStatusBadge(lancamento.status)}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Lancamentos Sistema */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">Lancamentos Sistema</CardTitle>
                <CardDescription>{lancamentosSistema.length} lancamentos</CardDescription>
              </div>
              <div className="relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                <Input
                  placeholder="Buscar..."
                  className="pl-7 h-8 w-40 text-xs"
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-[400px] overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-8"></TableHead>
                    <TableHead className="text-xs">Data</TableHead>
                    <TableHead className="text-xs">Descricao</TableHead>
                    <TableHead className="text-xs text-right">Valor</TableHead>
                    <TableHead className="text-xs">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lancamentosSistema
                    .filter((l) => l.descricao.toLowerCase().includes(busca.toLowerCase()))
                    .map((lancamento) => (
                      <TableRow
                        key={lancamento.id}
                        className={`cursor-pointer ${selecionadosSistema.includes(lancamento.id) ? "bg-emerald-50" : ""}`}
                      >
                        <TableCell>
                          <Checkbox
                            checked={selecionadosSistema.includes(lancamento.id)}
                            onCheckedChange={() => toggleSelecionadoSistema(lancamento.id)}
                            disabled={lancamento.conciliado}
                          />
                        </TableCell>
                        <TableCell className="text-xs text-slate-600">
                          {new Date(lancamento.data).toLocaleDateString("pt-BR")}
                        </TableCell>
                        <TableCell>
                          <p className="text-xs font-medium text-slate-900 truncate max-w-[180px]">
                            {lancamento.descricao}
                          </p>
                        </TableCell>
                        <TableCell
                          className={`text-xs font-semibold text-right ${
                            lancamento.tipo === "credito" ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {formatCurrency(lancamento.valor)}
                        </TableCell>
                        <TableCell>
                          {lancamento.conciliado ? (
                            <Badge className="bg-green-100 text-green-700">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              OK
                            </Badge>
                          ) : (
                            <Badge variant="outline">Aberto</Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Barra de Acoes */}
      {(selecionadosExtrato.length > 0 || selecionadosSistema.length > 0) && (
        <Card className="border-emerald-200 bg-emerald-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-sm">
                  <span className="font-medium text-emerald-700">
                    {selecionadosExtrato.length} extrato | {selecionadosSistema.length} sistema
                  </span>
                  <span className="text-emerald-600 ml-2">selecionados para conciliacao</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelecionadosExtrato([])
                    setSelecionadosSistema([])
                  }}
                >
                  <Unlink className="h-4 w-4 mr-2" />
                  Limpar
                </Button>
                <Button
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-700"
                  disabled={selecionadosExtrato.length === 0 || selecionadosSistema.length === 0}
                >
                  <Link2 className="h-4 w-4 mr-2" />
                  Conciliar Selecionados
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
        </div>
      </main>
    </div>
  )
}
