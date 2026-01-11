"use client"

import { Suspense, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { ObraComercialNavbar } from "../../_components/obra-comercial-navbar"
import {
  FileSpreadsheet,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Send,
  Lock,
  FileText,
  DollarSign,
  Package,
  Receipt,
  TrendingUp,
} from "lucide-react"

// Dados mockados do Fechamento
const resumoFechamento = {
  totalPedidos: 45,
  pedidosRecebidos: 42,
  pedidosPendentes: 3,
  valorTotalPedidos: 2850000,
  valorRecebido: 2650000,
  valorPendente: 200000,
  notasFiscais: 38,
  boletosGerados: 35,
  boletosPendentes: 3,
}

const pedidosFechamento = [
  {
    id: "PED-2026-0045",
    fornecedor: "ArcelorMittal Brasil",
    valorPedido: 125000,
    valorRecebido: 125000,
    nf: "NF-45890",
    boleto: "BOL-001",
    status: "consolidado",
  },
  {
    id: "PED-2026-0044",
    fornecedor: "Votorantim Cimentos",
    valorPedido: 45000,
    valorRecebido: 45000,
    nf: "NF-45678",
    boleto: "BOL-002",
    status: "consolidado",
  },
  {
    id: "PED-2026-0042",
    fornecedor: "Madeireira Tropical",
    valorPedido: 32000,
    valorRecebido: 32000,
    nf: "NF-45621",
    boleto: "BOL-003",
    status: "consolidado",
  },
  {
    id: "PED-2026-0040",
    fornecedor: "Ferramentas Delta",
    valorPedido: 8500,
    valorRecebido: 7225,
    nf: "NF-45589",
    boleto: null,
    status: "pendente_nc",
  },
  {
    id: "PED-2026-0038",
    fornecedor: "Aco Norte",
    valorPedido: 250000,
    valorRecebido: 250000,
    nf: "NF-45550",
    boleto: "BOL-004",
    status: "aguardando_validacao",
  },
]

const validacoesFechamento = [
  { id: 1, item: "Todos os pedidos conferidos", checked: true },
  { id: 2, item: "Todas as NFs vinculadas", checked: true },
  { id: 3, item: "Boletos gerados", checked: false },
  { id: 4, item: "Nao conformidades resolvidas", checked: false },
  { id: 5, item: "Valores consolidados", checked: false },
]

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

function FechamentoSuprimentosContent() {
  const [competencia, setCompetencia] = useState("jan-2026")
  const [validacoes, setValidacoes] = useState(validacoesFechamento)

  const percentualConcluido = (resumoFechamento.pedidosRecebidos / resumoFechamento.totalPedidos) * 100
  const todosConcluidos = validacoes.every((v) => v.checked)

  const toggleValidacao = (id: number) => {
    setValidacoes((prev) => prev.map((v) => (v.id === id ? { ...v, checked: !v.checked } : v)))
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "consolidado":
        return (
          <Badge className="bg-green-100 text-green-700">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Consolidado
          </Badge>
        )
      case "aguardando_validacao":
        return (
          <Badge variant="outline" className="text-amber-600 border-amber-300">
            <Clock className="w-3 h-3 mr-1" />
            Aguardando
          </Badge>
        )
      case "pendente_nc":
        return (
          <Badge variant="destructive">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Pendente NC
          </Badge>
        )
      default:
        return <Badge variant="outline">-</Badge>
    }
  }

  return (
    <div className="overflow-auto h-full">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-foreground">Fechamento de Suprimentos</h1>
            <Badge variant="outline" className="text-[10px] font-mono">
              SUP-FECH
            </Badge>
          </div>
          <div className="flex items-center gap-3">
            <Select value={competencia} onValueChange={setCompetencia}>
              <SelectTrigger className="w-40 bg-transparent">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="jan-2026">Janeiro/2026</SelectItem>
                <SelectItem value="dez-2025">Dezembro/2025</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="bg-transparent">
              <FileSpreadsheet className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg border border-border bg-card">
            <div className="flex items-center gap-2 mb-2">
              <Package className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Pedidos</span>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-2xl font-bold text-primary">{resumoFechamento.pedidosRecebidos}</div>
                <p className="text-xs text-muted-foreground">de {resumoFechamento.totalPedidos} recebidos</p>
              </div>
              <Progress value={percentualConcluido} className="w-16 h-2" />
            </div>
          </div>

          <div className="p-4 rounded-lg border border-border bg-card">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Valor Total</span>
            </div>
            <div className="text-2xl font-bold text-primary">{formatCurrency(resumoFechamento.valorTotalPedidos)}</div>
            <p className="text-xs text-muted-foreground">Pendente: {formatCurrency(resumoFechamento.valorPendente)}</p>
          </div>

          <div className="p-4 rounded-lg border border-border bg-card">
            <div className="flex items-center gap-2 mb-2">
              <Receipt className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Notas Fiscais</span>
            </div>
            <div className="text-2xl font-bold text-primary">{resumoFechamento.notasFiscais}</div>
            <p className="text-xs text-muted-foreground">Vinculadas aos pedidos</p>
          </div>

          <div className="p-4 rounded-lg border border-border bg-card">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Boletos</span>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-2xl font-bold text-primary">{resumoFechamento.boletosGerados}</div>
                <p className="text-xs text-muted-foreground">{resumoFechamento.boletosPendentes} pendentes</p>
              </div>
              {resumoFechamento.boletosPendentes > 0 && <AlertTriangle className="w-5 h-5 text-amber-500" />}
            </div>
          </div>
        </div>

        {/* Tabela de Consolidacao */}
        <div className="rounded-lg border border-border bg-card overflow-hidden">
          <div className="p-4 border-b border-border">
            <h2 className="text-base font-semibold">Consolidacao de Pedidos</h2>
            <p className="text-xs text-muted-foreground">Pedidos, recebimentos, notas fiscais e boletos do periodo</p>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pedido</TableHead>
                <TableHead>Fornecedor</TableHead>
                <TableHead className="text-right">Valor Pedido</TableHead>
                <TableHead className="text-right">Valor Recebido</TableHead>
                <TableHead>NF</TableHead>
                <TableHead>Boleto</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pedidosFechamento.map((pedido) => (
                <TableRow key={pedido.id}>
                  <TableCell className="font-mono font-semibold">{pedido.id}</TableCell>
                  <TableCell>{pedido.fornecedor}</TableCell>
                  <TableCell className="text-right font-mono">{formatCurrency(pedido.valorPedido)}</TableCell>
                  <TableCell className="text-right font-mono">
                    {pedido.valorRecebido !== pedido.valorPedido ? (
                      <span className="text-amber-600">{formatCurrency(pedido.valorRecebido)}</span>
                    ) : (
                      formatCurrency(pedido.valorRecebido)
                    )}
                  </TableCell>
                  <TableCell>
                    {pedido.nf ? (
                      <Badge variant="outline" className="font-mono text-xs">
                        {pedido.nf}
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {pedido.boleto ? (
                      <Badge variant="outline" className="font-mono text-xs">
                        {pedido.boleto}
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-amber-600 text-xs">
                        Pendente
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-center">{getStatusBadge(pedido.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Validacoes e Fechamento */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Checklist de Validacao */}
          <div className="p-4 rounded-lg border border-border bg-card">
            <h3 className="text-sm font-semibold mb-4">Validacoes para Fechamento</h3>
            <div className="space-y-3">
              {validacoes.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <Checkbox
                    id={`val-${item.id}`}
                    checked={item.checked}
                    onCheckedChange={() => toggleValidacao(item.id)}
                  />
                  <label htmlFor={`val-${item.id}`} className="text-sm cursor-pointer">
                    {item.item}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Status do Fechamento */}
          <div className="p-4 rounded-lg border border-border bg-card">
            <h3 className="text-sm font-semibold mb-4">Status do Fechamento</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Progresso</span>
                <div className="flex items-center gap-2">
                  <Progress
                    value={(validacoes.filter((v) => v.checked).length / validacoes.length) * 100}
                    className="w-24 h-2"
                  />
                  <span className="text-xs font-mono">
                    {validacoes.filter((v) => v.checked).length}/{validacoes.length}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Competencia</span>
                <Badge variant="outline">{competencia}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                {todosConcluidos ? (
                  <Badge className="bg-green-100 text-green-700">Pronto para Fechar</Badge>
                ) : (
                  <Badge variant="outline" className="text-amber-600">
                    Pendencias
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Acoes de Fechamento */}
        <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-card">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm font-medium">Enviar para Custo/Meta</p>
              <p className="text-xs text-muted-foreground">
                Apos o fechamento, os custos serao enviados para aprovacao do setor de Custo/Meta
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="bg-transparent">
              <Lock className="w-4 h-4 mr-2" />
              Travar Periodo
            </Button>
            <Button disabled={!todosConcluidos}>
              <Send className="w-4 h-4 mr-2" />
              Fechar e Enviar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function FechamentoSuprimentosPage() {
  return (
    <Suspense fallback={null}>
      <FechamentoSuprimentosContent />
    </Suspense>
  )
}
