"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Package,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertTriangle,
  FileText,
  ChevronRight,
  X,
  ShoppingCart,
  Truck,
  Users,
  BarChart3,
  Calendar,
  DollarSign,
} from "lucide-react"

// Dados mockados
const resumoGeral = {
  orcamentoTotal: 18500000,
  comprometido: 14200000,
  realizado: 12800000,
  saldoDisponivel: 4300000,
  percentualComprometido: 76.8,
  pedidosPendentes: 23,
  pedidosAtrasados: 5,
  fornecedoresAtivos: 42,
}

const categorias = [
  { nome: "Materiais", orcamento: 8500000, comprometido: 6800000, realizado: 5900000, status: "ok" },
  { nome: "Equipamentos", orcamento: 4200000, comprometido: 3600000, realizado: 3200000, status: "atencao" },
  { nome: "Servicos Terceiros", orcamento: 3800000, comprometido: 2400000, realizado: 2100000, status: "ok" },
  { nome: "Locacoes", orcamento: 2000000, comprometido: 1400000, realizado: 1600000, status: "critico" },
]

const pedidosRecentes = [
  {
    id: "PC-2025-0142",
    descricao: "Aco CA-50",
    fornecedor: "Gerdau",
    valor: 285000,
    status: "aprovado",
    prazo: "18/01/2025",
  },
  {
    id: "PC-2025-0141",
    descricao: "Cimento CP-IV",
    fornecedor: "Votorantim",
    valor: 156000,
    status: "pendente",
    prazo: "20/01/2025",
  },
  {
    id: "PC-2025-0140",
    descricao: "Locacao Grua",
    fornecedor: "Mills",
    valor: 420000,
    status: "em_analise",
    prazo: "15/01/2025",
  },
  {
    id: "PC-2025-0139",
    descricao: "Forma Metalica",
    fornecedor: "Peri",
    valor: 380000,
    status: "aprovado",
    prazo: "22/01/2025",
  },
  {
    id: "PC-2025-0138",
    descricao: "Concreto FCK 40",
    fornecedor: "Engemix",
    valor: 210000,
    status: "atrasado",
    prazo: "10/01/2025",
  },
]

const alertas = [
  { tipo: "critico", mensagem: "5 pedidos com prazo vencido", acao: "Verificar" },
  { tipo: "atencao", mensagem: "Locacoes acima do orcamento em 14%", acao: "Analisar" },
  { tipo: "info", mensagem: "3 contratos vencem em 30 dias", acao: "Renovar" },
]

export default function SuprimentosVisaoPage() {
  const [competencia, setCompetencia] = useState("2025-01")
  const [pedidoSelecionado, setPedidoSelecionado] = useState<(typeof pedidosRecentes)[0] | null>(null)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "aprovado":
        return (
          <Badge variant="outline" className="border-primary/30 text-primary">
            Aprovado
          </Badge>
        )
      case "pendente":
        return (
          <Badge variant="outline" className="border-accent-foreground/30 text-accent-foreground">
            Pendente
          </Badge>
        )
      case "em_analise":
        return (
          <Badge variant="outline" className="border-muted-foreground/30 text-muted-foreground">
            Em Analise
          </Badge>
        )
      case "atrasado":
        return (
          <Badge variant="outline" className="border-destructive/30 text-destructive">
            Atrasado
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getCategoriaStatus = (status: string) => {
    switch (status) {
      case "ok":
        return <span className="w-2 h-2 rounded-full bg-primary" />
      case "atencao":
        return <span className="w-2 h-2 rounded-full bg-accent-foreground" />
      case "critico":
        return <span className="w-2 h-2 rounded-full bg-destructive" />
      default:
        return <span className="w-2 h-2 rounded-full bg-muted-foreground" />
    }
  }

  return (
    <div className="overflow-auto h-full">
      <div className="p-4 md:p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-foreground">Suprimentos</h1>
              <Badge variant="outline" className="text-xs">
                SP-01
              </Badge>
            </div>
            <p className="text-muted-foreground text-sm">Visao geral da cadeia de suprimentos</p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={competencia} onValueChange={setCompetencia}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2025-01">Janeiro 2025</SelectItem>
                <SelectItem value="2024-12">Dezembro 2024</SelectItem>
                <SelectItem value="2024-11">Novembro 2024</SelectItem>
              </SelectContent>
            </Select>
            <Badge variant="outline">Em Operacao</Badge>
          </div>
        </div>

        {/* KPIs Principais */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="border bg-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Orcamento Total</p>
                  <p className="text-xl font-bold text-foreground">{formatCurrency(resumoGeral.orcamentoTotal)}</p>
                </div>
                <DollarSign className="w-5 h-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          <Card className="border bg-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Comprometido</p>
                  <p className="text-xl font-bold text-foreground">{formatCurrency(resumoGeral.comprometido)}</p>
                  <p className="text-xs text-muted-foreground">{resumoGeral.percentualComprometido}%</p>
                </div>
                <ShoppingCart className="w-5 h-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          <Card className="border bg-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Realizado</p>
                  <p className="text-xl font-bold text-foreground">{formatCurrency(resumoGeral.realizado)}</p>
                </div>
                <CheckCircle2 className="w-5 h-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          <Card className="border bg-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Saldo Disponivel</p>
                  <p className="text-xl font-bold text-primary">{formatCurrency(resumoGeral.saldoDisponivel)}</p>
                </div>
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Indicadores Operacionais */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="border bg-card">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-muted">
                <Clock className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{resumoGeral.pedidosPendentes}</p>
                <p className="text-xs text-muted-foreground">Pedidos Pendentes</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border bg-card">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-destructive/10">
                <AlertTriangle className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold text-destructive">{resumoGeral.pedidosAtrasados}</p>
                <p className="text-xs text-muted-foreground">Pedidos Atrasados</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border bg-card">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-muted">
                <Users className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{resumoGeral.fornecedoresAtivos}</p>
                <p className="text-xs text-muted-foreground">Fornecedores Ativos</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Orcamento por Categoria */}
          <Card className="md:col-span-2 border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-muted-foreground" />
                Orcamento por Categoria
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 font-medium text-muted-foreground">Categoria</th>
                      <th className="text-right py-2 font-medium text-muted-foreground">Orcamento</th>
                      <th className="text-right py-2 font-medium text-muted-foreground">Comprometido</th>
                      <th className="text-right py-2 font-medium text-muted-foreground">Realizado</th>
                      <th className="text-center py-2 font-medium text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categorias.map((cat, idx) => (
                      <tr key={idx} className="border-b border-muted/30 hover:bg-muted/20">
                        <td className="py-3 font-medium text-foreground">{cat.nome}</td>
                        <td className="py-3 text-right text-foreground">{formatCurrency(cat.orcamento)}</td>
                        <td className="py-3 text-right text-foreground">{formatCurrency(cat.comprometido)}</td>
                        <td className="py-3 text-right text-foreground">{formatCurrency(cat.realizado)}</td>
                        <td className="py-3 text-center">
                          <div className="flex justify-center">{getCategoriaStatus(cat.status)}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="font-semibold">
                      <td className="py-3 text-foreground">TOTAL</td>
                      <td className="py-3 text-right text-foreground">
                        {formatCurrency(categorias.reduce((a, b) => a + b.orcamento, 0))}
                      </td>
                      <td className="py-3 text-right text-foreground">
                        {formatCurrency(categorias.reduce((a, b) => a + b.comprometido, 0))}
                      </td>
                      <td className="py-3 text-right text-foreground">
                        {formatCurrency(categorias.reduce((a, b) => a + b.realizado, 0))}
                      </td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Alertas */}
          <Card className="border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-muted-foreground" />
                Alertas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {alertas.map((alerta, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border">
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        alerta.tipo === "critico"
                          ? "bg-destructive"
                          : alerta.tipo === "atencao"
                            ? "bg-accent-foreground"
                            : "bg-primary"
                      }`}
                    />
                    <span className="text-sm text-foreground">{alerta.mensagem}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-xs text-primary">
                    {alerta.acao}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Pedidos Recentes */}
        <Card className="border bg-card">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Package className="w-4 h-4 text-muted-foreground" />
                Pedidos Recentes
              </CardTitle>
              <Button variant="ghost" size="sm" className="text-xs text-primary">
                Ver todos <ChevronRight className="w-3 h-3 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 font-medium text-muted-foreground">Pedido</th>
                    <th className="text-left py-2 font-medium text-muted-foreground">Descricao</th>
                    <th className="text-left py-2 font-medium text-muted-foreground">Fornecedor</th>
                    <th className="text-right py-2 font-medium text-muted-foreground">Valor</th>
                    <th className="text-center py-2 font-medium text-muted-foreground">Prazo</th>
                    <th className="text-center py-2 font-medium text-muted-foreground">Status</th>
                    <th className="text-center py-2 font-medium text-muted-foreground">Acao</th>
                  </tr>
                </thead>
                <tbody>
                  {pedidosRecentes.map((pedido) => (
                    <tr key={pedido.id} className="border-b border-muted/30 hover:bg-muted/20">
                      <td className="py-3 font-mono text-xs text-foreground">{pedido.id}</td>
                      <td className="py-3 text-foreground">{pedido.descricao}</td>
                      <td className="py-3 text-muted-foreground">{pedido.fornecedor}</td>
                      <td className="py-3 text-right font-medium text-foreground">{formatCurrency(pedido.valor)}</td>
                      <td className="py-3 text-center text-muted-foreground">{pedido.prazo}</td>
                      <td className="py-3 text-center">{getStatusBadge(pedido.status)}</td>
                      <td className="py-3 text-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs text-primary"
                          onClick={() => setPedidoSelecionado(pedido)}
                        >
                          Detalhe
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Navegacao */}
        <Card className="border bg-muted/30">
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" size="sm" className="text-xs bg-transparent">
                <Truck className="w-3 h-3 mr-2" />
                SP-02 Pedidos
              </Button>
              <Button variant="outline" size="sm" className="text-xs bg-transparent">
                <Users className="w-3 h-3 mr-2" />
                SP-03 Fornecedores
              </Button>
              <Button variant="outline" size="sm" className="text-xs bg-transparent">
                <FileText className="w-3 h-3 mr-2" />
                SP-04 Contratos
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Painel Lateral - Detalhe do Pedido */}
      {pedidoSelecionado && (
        <div className="fixed inset-y-0 right-0 w-full md:w-[400px] bg-background border-l shadow-lg z-40 overflow-auto">
          <div className="p-4 border-b flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Detalhe do Pedido</h3>
            <Button variant="ghost" size="sm" onClick={() => setPedidoSelecionado(null)}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm text-muted-foreground">{pedidoSelecionado.id}</span>
              {getStatusBadge(pedidoSelecionado.status)}
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground">Descricao</p>
                <p className="font-medium text-foreground">{pedidoSelecionado.descricao}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Fornecedor</p>
                <p className="font-medium text-foreground">{pedidoSelecionado.fornecedor}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Valor</p>
                  <p className="font-bold text-lg text-foreground">{formatCurrency(pedidoSelecionado.valor)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Prazo</p>
                  <p className="font-medium text-foreground">{pedidoSelecionado.prazo}</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t space-y-2">
              <Button className="w-full" size="sm">
                <FileText className="w-3 h-3 mr-2" />
                Ver Documento Completo
              </Button>
              <Button variant="outline" className="w-full bg-transparent" size="sm">
                <Calendar className="w-3 h-3 mr-2" />
                Historico do Pedido
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
