"use client"

import { useState, Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InfoTooltip } from "@/components/ui/info-tooltip"
import {
  Plus,
  DollarSign,
  Wallet,
  CreditCard,
  CheckCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Calendar,
  Download,
  ChevronRight,
  FileText,
  Receipt,
  Building,
} from "lucide-react"

// Resumo Geral
const resumoFinanceiro = {
  saldoCaixa: 125000,
  entradas: 3995000,
  saidas: 3870000,
  saldoProjetado: 250000,
  fundoFixoTotal: 5000,
  fundoFixoUtilizado: 1350,
  fundoFixoDisponivel: 3650,
  pagamentosPendentes: 4450,
  contasAVencer: 12500,
}

// Fluxo de Caixa Mensal
const fluxoCaixa = [
  { mes: "Set", entradas: 3200000, saidas: 3100000, saldo: 100000 },
  { mes: "Out", entradas: 3450000, saidas: 3350000, saldo: 200000 },
  { mes: "Nov", entradas: 3800000, saidas: 3650000, saldo: 350000 },
  { mes: "Dez", entradas: 3995000, saidas: 3870000, saldo: 475000 },
  { mes: "Jan", entradas: 2894730, saidas: 2700000, saldo: 669730 },
]

// Fundo Fixo
const fundoFixoMock = [
  {
    id: "FF-001",
    descricao: "Material de escritorio",
    valor: 450,
    data: "2026-01-02",
    categoria: "Material",
    status: "prestado",
    responsavel: "Ana Silva",
    comprovante: "REC-0012",
    observacao: "Compra emergencial para reuniao com cliente",
  },
  {
    id: "FF-002",
    descricao: "Combustivel - veiculo apoio",
    valor: 380,
    data: "2026-01-03",
    categoria: "Combustivel",
    status: "prestado",
    responsavel: "Carlos Lima",
    comprovante: "NF-45678",
    observacao: "Deslocamento para vistoria trecho norte",
  },
  {
    id: "FF-003",
    descricao: "Refeicoes equipe - reuniao externa",
    valor: 520,
    data: "2026-01-04",
    categoria: "Alimentacao",
    status: "pendente",
    responsavel: "Maria Costa",
    comprovante: null,
    observacao: "Aguardando NF do restaurante",
  },
]

// Pagamentos Locais
const pagamentosMock = [
  {
    id: "PAG-001",
    fornecedor: "Posto Shell km 105",
    cnpj: "12.345.678/0001-90",
    descricao: "Abastecimento emergencial",
    valor: 1200,
    data: "2026-01-03",
    vencimento: "2026-01-10",
    formaPagamento: "Cartao Corporativo",
    status: "pago",
    nf: "NF-12345",
    categoria: "Combustivel",
  },
  {
    id: "PAG-002",
    fornecedor: "Restaurante Beira Rio",
    cnpj: "98.765.432/0001-10",
    descricao: "Almoco equipe fiscalizacao",
    valor: 850,
    data: "2026-01-04",
    vencimento: "2026-01-04",
    formaPagamento: "Fundo Fixo",
    status: "pago",
    nf: "NF-12346",
    categoria: "Alimentacao",
  },
  {
    id: "PAG-003",
    fornecedor: "Ferretaria Central",
    cnpj: "11.222.333/0001-44",
    descricao: "Ferramentas manuais urgente",
    valor: 2400,
    data: "2026-01-04",
    vencimento: "2026-01-15",
    formaPagamento: "Boleto",
    status: "pendente",
    nf: "NF-12347",
    categoria: "Material",
  },
]

// Contas a Pagar
const contasAPagar = [
  {
    id: "CP-001",
    fornecedor: "Locadora de Veiculos ABC",
    descricao: "Aluguel mensal - 3 veiculos",
    valor: 4500,
    vencimento: "2026-01-10",
    status: "a_vencer",
    diasParaVencer: 4,
  },
  {
    id: "CP-002",
    fornecedor: "Internet & Telecom",
    descricao: "Internet + Telefonia",
    valor: 1200,
    vencimento: "2026-01-15",
    status: "a_vencer",
    diasParaVencer: 9,
  },
  {
    id: "CP-003",
    fornecedor: "Energia Eletrica",
    descricao: "Conta de luz canteiro",
    valor: 3800,
    vencimento: "2026-01-20",
    status: "a_vencer",
    diasParaVencer: 14,
  },
  {
    id: "CP-004",
    fornecedor: "Agua e Esgoto",
    descricao: "Conta de agua canteiro",
    valor: 1500,
    vencimento: "2026-01-05",
    status: "vencido",
    diasAtraso: 1,
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

function FinanceiroContent() {
  const [tab, setTab] = useState("visao")
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [sheetType, setSheetType] = useState<"fundo" | "pagamento" | "conta">("fundo")

  const handleSelectFundo = (item: any) => {
    setSelectedItem(item)
    setSheetType("fundo")
    setSheetOpen(true)
  }

  const handleSelectPagamento = (item: any) => {
    setSelectedItem(item)
    setSheetType("pagamento")
    setSheetOpen(true)
  }

  const handleSelectConta = (item: any) => {
    setSelectedItem(item)
    setSheetType("conta")
    setSheetOpen(true)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "prestado":
      case "pago":
        return (
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
            <CheckCircle className="w-3 h-3 mr-1" />
            {status === "prestado" ? "Prestado" : "Pago"}
          </Badge>
        )
      case "pendente":
      case "a_vencer":
        return (
          <Badge variant="outline" className="bg-accent/10 text-accent-foreground border-accent/30">
            <Clock className="w-3 h-3 mr-1" />
            {status === "pendente" ? "Pendente" : "A Vencer"}
          </Badge>
        )
      case "vencido":
        return (
          <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/30">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Vencido
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const totalPendentes = contasAPagar.filter((c) => c.status === "a_vencer").reduce((acc, c) => acc + c.valor, 0)
  const totalVencidos = contasAPagar.filter((c) => c.status === "vencido").reduce((acc, c) => acc + c.valor, 0)

  return (
    <div className="overflow-auto h-full">
      <div className="flex flex-col h-full p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 border border-primary/20">
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-foreground">Financeiro da Obra</h1>
                <Badge variant="outline" className="text-xs">
                  AD-02
                </Badge>
                <InfoTooltip
                  title="Financeiro da Obra"
                  description="Gestao de caixa local, fundo fixo, pagamentos e contas a pagar. Controle operacional financeiro."
                />
              </div>
              <p className="text-sm text-muted-foreground">BR-101 LOTE 2 - Janeiro/2026</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="bg-transparent">
              <Calendar className="w-4 h-4 mr-2" />
              Periodo
            </Button>
            <Button variant="outline" size="sm" className="bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Nova Despesa
            </Button>
          </div>
        </div>

        {/* Resumo */}
        <div className="grid grid-cols-6 gap-3 mb-4 flex-shrink-0">
          <Card className="border-border/50">
            <CardContent className="p-3 text-center">
              <div className="flex items-center justify-center w-8 h-8 mx-auto mb-1 rounded-lg bg-primary/10">
                <Wallet className="w-4 h-4 text-primary" />
              </div>
              <p className="text-lg font-bold text-primary">{formatCurrency(resumoFinanceiro.saldoCaixa)}</p>
              <p className="text-xs text-muted-foreground">Saldo Caixa</p>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="p-3 text-center">
              <div className="flex items-center justify-center w-8 h-8 mx-auto mb-1 rounded-lg bg-primary/10">
                <ArrowUpRight className="w-4 h-4 text-primary" />
              </div>
              <p className="text-lg font-bold text-primary">{formatCurrency(resumoFinanceiro.entradas)}</p>
              <p className="text-xs text-muted-foreground">Entradas Mes</p>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="p-3 text-center">
              <div className="flex items-center justify-center w-8 h-8 mx-auto mb-1 rounded-lg bg-accent/10">
                <ArrowDownRight className="w-4 h-4 text-accent-foreground" />
              </div>
              <p className="text-lg font-bold text-accent-foreground">{formatCurrency(resumoFinanceiro.saidas)}</p>
              <p className="text-xs text-muted-foreground">Saidas Mes</p>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="p-3 text-center">
              <div className="flex items-center justify-center w-8 h-8 mx-auto mb-1 rounded-lg bg-muted/50">
                <Wallet className="w-4 h-4 text-muted-foreground" />
              </div>
              <p className="text-lg font-bold">{formatCurrency(resumoFinanceiro.fundoFixoDisponivel)}</p>
              <p className="text-xs text-muted-foreground">Fundo Fixo Disp.</p>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="p-3 text-center">
              <div className="flex items-center justify-center w-8 h-8 mx-auto mb-1 rounded-lg bg-accent/10">
                <Clock className="w-4 h-4 text-accent-foreground" />
              </div>
              <p className="text-lg font-bold text-accent-foreground">{formatCurrency(totalPendentes)}</p>
              <p className="text-xs text-muted-foreground">A Pagar</p>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="p-3 text-center">
              <div className="flex items-center justify-center w-8 h-8 mx-auto mb-1 rounded-lg bg-destructive/10">
                <AlertTriangle className="w-4 h-4 text-destructive" />
              </div>
              <p className="text-lg font-bold text-destructive">{formatCurrency(totalVencidos)}</p>
              <p className="text-xs text-muted-foreground">Vencidos</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={tab} onValueChange={setTab} className="flex-1 flex flex-col min-h-0">
          <TabsList className="w-fit mb-3 flex-shrink-0">
            <TabsTrigger value="visao">Visao Geral</TabsTrigger>
            <TabsTrigger value="fundofixo">Fundo Fixo</TabsTrigger>
            <TabsTrigger value="pagamentos">Pagamentos</TabsTrigger>
            <TabsTrigger value="contas">Contas a Pagar</TabsTrigger>
          </TabsList>

          <div className="flex-1 min-h-0">
            <ScrollArea className="h-full">
              <div className="space-y-4 pr-4">
                {/* Visao Geral */}
                <TabsContent value="visao" className="mt-0 space-y-4">
                  {/* Alertas */}
                  {totalVencidos > 0 && (
                    <Card className="border-destructive/30 bg-destructive/5">
                      <CardContent className="p-3">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-destructive" />
                          <span className="text-sm font-medium text-destructive">
                            {formatCurrency(totalVencidos)} em contas vencidas - Regularizar imediatamente
                          </span>
                          <Button variant="outline" size="sm" className="ml-auto h-7 text-xs bg-transparent">
                            Ver Detalhes
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Fluxo de Caixa */}
                  <Card className="border-border/50">
                    <CardHeader className="py-3">
                      <CardTitle className="text-base">Fluxo de Caixa (Ultimos 5 Meses)</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="border rounded-lg overflow-hidden">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-muted/30 border-b">
                              <th className="text-left p-2 font-medium text-muted-foreground">Mes</th>
                              <th className="text-right p-2 font-medium text-muted-foreground">Entradas</th>
                              <th className="text-right p-2 font-medium text-muted-foreground">Saidas</th>
                              <th className="text-right p-2 font-medium text-muted-foreground">Saldo</th>
                              <th className="text-center p-2 font-medium text-muted-foreground">Evolucao</th>
                            </tr>
                          </thead>
                          <tbody>
                            {fluxoCaixa.map((mes, index) => {
                              const isAtual = index === fluxoCaixa.length - 1
                              const anterior = index > 0 ? fluxoCaixa[index - 1].saldo : 0
                              const variacao = anterior > 0 ? ((mes.saldo - anterior) / anterior) * 100 : 0
                              return (
                                <tr key={mes.mes} className={`border-b last:border-0 ${isAtual ? "bg-primary/5" : ""}`}>
                                  <td className={`p-2 ${isAtual ? "font-bold" : ""}`}>{mes.mes}</td>
                                  <td className="p-2 text-right font-mono text-primary">
                                    {formatCurrency(mes.entradas)}
                                  </td>
                                  <td className="p-2 text-right font-mono text-accent-foreground">
                                    {formatCurrency(mes.saidas)}
                                  </td>
                                  <td className={`p-2 text-right font-mono ${isAtual ? "font-bold" : ""}`}>
                                    {formatCurrency(mes.saldo)}
                                  </td>
                                  <td className="p-2 text-center">
                                    {variacao > 0 ? (
                                      <span className="flex items-center justify-center gap-1 text-xs text-primary">
                                        <TrendingUp className="w-3 h-3" />+{variacao.toFixed(0)}%
                                      </span>
                                    ) : variacao < 0 ? (
                                      <span className="flex items-center justify-center gap-1 text-xs text-destructive">
                                        <TrendingDown className="w-3 h-3" />
                                        {variacao.toFixed(0)}%
                                      </span>
                                    ) : (
                                      <span className="text-xs text-muted-foreground">-</span>
                                    )}
                                  </td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Fundo Fixo Resumido */}
                  <Card className="border-border/50">
                    <CardHeader className="py-3">
                      <CardTitle className="flex items-center justify-between text-base">
                        <span>Fundo Fixo</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-normal text-muted-foreground">
                            Disponivel: {formatCurrency(resumoFinanceiro.fundoFixoDisponivel)} de{" "}
                            {formatCurrency(resumoFinanceiro.fundoFixoTotal)}
                          </span>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="h-3 bg-muted/30 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{
                            width: `${(resumoFinanceiro.fundoFixoUtilizado / resumoFinanceiro.fundoFixoTotal) * 100}%`,
                          }}
                        />
                      </div>
                      <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                        <span>Utilizado: {formatCurrency(resumoFinanceiro.fundoFixoUtilizado)}</span>
                        <span>
                          {((resumoFinanceiro.fundoFixoUtilizado / resumoFinanceiro.fundoFixoTotal) * 100).toFixed(0)}%
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Fundo Fixo */}
                <TabsContent value="fundofixo" className="mt-0">
                  <Card className="border-border/50">
                    <CardHeader className="py-3">
                      <CardTitle className="flex items-center justify-between text-base">
                        <span>Lancamentos Fundo Fixo</span>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {fundoFixoMock.filter((f) => f.status === "pendente").length} pendentes
                          </Badge>
                          <Button size="sm">
                            <Plus className="w-4 h-4 mr-2" />
                            Nova Despesa
                          </Button>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="border rounded-lg overflow-hidden">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-muted/30 border-b">
                              <th className="text-left p-2 font-medium text-muted-foreground">ID</th>
                              <th className="text-left p-2 font-medium text-muted-foreground">Descricao</th>
                              <th className="text-left p-2 font-medium text-muted-foreground">Categoria</th>
                              <th className="text-right p-2 font-medium text-muted-foreground">Valor</th>
                              <th className="text-left p-2 font-medium text-muted-foreground">Data</th>
                              <th className="text-left p-2 font-medium text-muted-foreground">Responsavel</th>
                              <th className="text-center p-2 font-medium text-muted-foreground">Status</th>
                              <th className="text-center p-2 font-medium text-muted-foreground w-10"></th>
                            </tr>
                          </thead>
                          <tbody>
                            {fundoFixoMock.map((ff) => (
                              <tr
                                key={ff.id}
                                className="border-b last:border-0 hover:bg-muted/20 cursor-pointer transition-colors"
                                onClick={() => handleSelectFundo(ff)}
                              >
                                <td className="p-2 font-mono font-medium">{ff.id}</td>
                                <td className="p-2">{ff.descricao}</td>
                                <td className="p-2">
                                  <Badge variant="outline" className="text-xs">
                                    {ff.categoria}
                                  </Badge>
                                </td>
                                <td className="p-2 text-right font-mono">{formatCurrency(ff.valor)}</td>
                                <td className="p-2">{formatDate(ff.data)}</td>
                                <td className="p-2">{ff.responsavel}</td>
                                <td className="p-2 text-center">{getStatusBadge(ff.status)}</td>
                                <td className="p-2 text-center">
                                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Pagamentos */}
                <TabsContent value="pagamentos" className="mt-0">
                  <Card className="border-border/50">
                    <CardHeader className="py-3">
                      <CardTitle className="flex items-center justify-between text-base">
                        <span>Pagamentos Locais</span>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {pagamentosMock.filter((p) => p.status === "pendente").length} pendentes
                          </Badge>
                          <Button size="sm">
                            <Plus className="w-4 h-4 mr-2" />
                            Novo Pagamento
                          </Button>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="border rounded-lg overflow-hidden">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-muted/30 border-b">
                              <th className="text-left p-2 font-medium text-muted-foreground">ID</th>
                              <th className="text-left p-2 font-medium text-muted-foreground">Fornecedor</th>
                              <th className="text-left p-2 font-medium text-muted-foreground">Descricao</th>
                              <th className="text-right p-2 font-medium text-muted-foreground">Valor</th>
                              <th className="text-left p-2 font-medium text-muted-foreground">Forma Pgto</th>
                              <th className="text-left p-2 font-medium text-muted-foreground">NF</th>
                              <th className="text-center p-2 font-medium text-muted-foreground">Status</th>
                              <th className="text-center p-2 font-medium text-muted-foreground w-10"></th>
                            </tr>
                          </thead>
                          <tbody>
                            {pagamentosMock.map((pag) => (
                              <tr
                                key={pag.id}
                                className="border-b last:border-0 hover:bg-muted/20 cursor-pointer transition-colors"
                                onClick={() => handleSelectPagamento(pag)}
                              >
                                <td className="p-2 font-mono font-medium">{pag.id}</td>
                                <td className="p-2">{pag.fornecedor}</td>
                                <td className="p-2 text-muted-foreground">{pag.descricao}</td>
                                <td className="p-2 text-right font-mono font-bold">{formatCurrency(pag.valor)}</td>
                                <td className="p-2">
                                  <Badge variant="outline" className="text-xs">
                                    {pag.formaPagamento}
                                  </Badge>
                                </td>
                                <td className="p-2 font-mono text-xs">{pag.nf}</td>
                                <td className="p-2 text-center">{getStatusBadge(pag.status)}</td>
                                <td className="p-2 text-center">
                                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Contas a Pagar */}
                <TabsContent value="contas" className="mt-0">
                  <Card className="border-border/50">
                    <CardHeader className="py-3">
                      <CardTitle className="flex items-center justify-between text-base">
                        <span>Contas a Pagar</span>
                        <div className="flex items-center gap-2">
                          {totalVencidos > 0 && (
                            <Badge
                              variant="outline"
                              className="text-xs bg-destructive/10 text-destructive border-destructive/30"
                            >
                              {contasAPagar.filter((c) => c.status === "vencido").length} vencidas
                            </Badge>
                          )}
                          <Badge variant="outline" className="text-xs">
                            {contasAPagar.filter((c) => c.status === "a_vencer").length} a vencer
                          </Badge>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="border rounded-lg overflow-hidden">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-muted/30 border-b">
                              <th className="text-left p-2 font-medium text-muted-foreground">ID</th>
                              <th className="text-left p-2 font-medium text-muted-foreground">Fornecedor</th>
                              <th className="text-left p-2 font-medium text-muted-foreground">Descricao</th>
                              <th className="text-right p-2 font-medium text-muted-foreground">Valor</th>
                              <th className="text-left p-2 font-medium text-muted-foreground">Vencimento</th>
                              <th className="text-center p-2 font-medium text-muted-foreground">Dias</th>
                              <th className="text-center p-2 font-medium text-muted-foreground">Status</th>
                              <th className="text-center p-2 font-medium text-muted-foreground w-10"></th>
                            </tr>
                          </thead>
                          <tbody>
                            {contasAPagar.map((conta) => (
                              <tr
                                key={conta.id}
                                className={`border-b last:border-0 hover:bg-muted/20 cursor-pointer transition-colors ${
                                  conta.status === "vencido" ? "bg-destructive/5" : ""
                                }`}
                                onClick={() => handleSelectConta(conta)}
                              >
                                <td className="p-2 font-mono font-medium">{conta.id}</td>
                                <td className="p-2">{conta.fornecedor}</td>
                                <td className="p-2 text-muted-foreground">{conta.descricao}</td>
                                <td className="p-2 text-right font-mono font-bold">{formatCurrency(conta.valor)}</td>
                                <td className="p-2">{formatDate(conta.vencimento)}</td>
                                <td className="p-2 text-center">
                                  {conta.status === "vencido" ? (
                                    <span className="text-destructive font-medium">{conta.diasAtraso}d atraso</span>
                                  ) : (
                                    <span className="text-muted-foreground">{conta.diasParaVencer}d</span>
                                  )}
                                </td>
                                <td className="p-2 text-center">{getStatusBadge(conta.status)}</td>
                                <td className="p-2 text-center">
                                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Governanca */}
                <Card className="border-accent/30 bg-accent/5">
                  <CardContent className="p-3">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-accent-foreground mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Regras de Governanca</p>
                        <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                          <li>• Fundo fixo deve ser prestado em ate 48h</li>
                          <li>• Pagamentos acima de R$ 5.000 exigem aprovacao do gerente</li>
                          <li>• Contas vencidas devem ser escaladas ao financeiro corporativo</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </ScrollArea>
          </div>
        </Tabs>

        {/* Painel Lateral */}
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetContent className="w-[450px] sm:max-w-[450px] overflow-y-auto">
            {sheetType === "fundo" && selectedItem && (
              <>
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <Wallet className="w-5 h-5 text-primary" />
                    Detalhe Fundo Fixo
                  </SheetTitle>
                </SheetHeader>

                <div className="mt-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-bold font-mono">{selectedItem.id}</p>
                    {getStatusBadge(selectedItem.status)}
                  </div>

                  <Card className="border-primary/30 bg-primary/5">
                    <CardContent className="p-4 text-center">
                      <p className="text-sm text-muted-foreground">Valor</p>
                      <p className="text-3xl font-bold text-primary">{formatCurrency(selectedItem.valor)}</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="text-sm">Informacoes</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Descricao</span>
                        <span>{selectedItem.descricao}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Categoria</span>
                        <Badge variant="outline">{selectedItem.categoria}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Data</span>
                        <span>{formatDate(selectedItem.data)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Responsavel</span>
                        <span>{selectedItem.responsavel}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Comprovante</span>
                        <span>{selectedItem.comprovante || "Pendente"}</span>
                      </div>
                    </CardContent>
                  </Card>

                  {selectedItem.observacao && (
                    <Card>
                      <CardHeader className="py-3">
                        <CardTitle className="text-sm">Observacao</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-sm text-muted-foreground">{selectedItem.observacao}</p>
                      </CardContent>
                    </Card>
                  )}

                  <div className="flex gap-2">
                    {selectedItem.status === "pendente" && <Button className="flex-1">Prestar Contas</Button>}
                    <Button variant="outline" className="flex-1 bg-transparent">
                      <FileText className="w-4 h-4 mr-2" />
                      Ver Comprovante
                    </Button>
                  </div>
                </div>
              </>
            )}

            {sheetType === "pagamento" && selectedItem && (
              <>
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-primary" />
                    Detalhe Pagamento
                  </SheetTitle>
                </SheetHeader>

                <div className="mt-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-bold font-mono">{selectedItem.id}</p>
                    {getStatusBadge(selectedItem.status)}
                  </div>

                  <Card className="border-primary/30 bg-primary/5">
                    <CardContent className="p-4 text-center">
                      <p className="text-sm text-muted-foreground">Valor</p>
                      <p className="text-3xl font-bold text-primary">{formatCurrency(selectedItem.valor)}</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="text-sm">Fornecedor</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Nome</span>
                        <span>{selectedItem.fornecedor}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">CNPJ</span>
                        <span className="font-mono">{selectedItem.cnpj}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="text-sm">Pagamento</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Forma</span>
                        <Badge variant="outline">{selectedItem.formaPagamento}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Vencimento</span>
                        <span>{formatDate(selectedItem.vencimento)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">NF</span>
                        <span className="font-mono">{selectedItem.nf}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex gap-2">
                    {selectedItem.status === "pendente" && <Button className="flex-1">Realizar Pagamento</Button>}
                    <Button variant="outline" className="flex-1 bg-transparent">
                      <Receipt className="w-4 h-4 mr-2" />
                      Ver NF
                    </Button>
                  </div>
                </div>
              </>
            )}

            {sheetType === "conta" && selectedItem && (
              <>
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <Building className="w-5 h-5 text-primary" />
                    Detalhe Conta
                  </SheetTitle>
                </SheetHeader>

                <div className="mt-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-bold font-mono">{selectedItem.id}</p>
                    {getStatusBadge(selectedItem.status)}
                  </div>

                  <Card
                    className={
                      selectedItem.status === "vencido"
                        ? "border-destructive/30 bg-destructive/5"
                        : "border-primary/30 bg-primary/5"
                    }
                  >
                    <CardContent className="p-4 text-center">
                      <p className="text-sm text-muted-foreground">Valor</p>
                      <p
                        className={`text-3xl font-bold ${selectedItem.status === "vencido" ? "text-destructive" : "text-primary"}`}
                      >
                        {formatCurrency(selectedItem.valor)}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="text-sm">Informacoes</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Fornecedor</span>
                        <span>{selectedItem.fornecedor}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Descricao</span>
                        <span>{selectedItem.descricao}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Vencimento</span>
                        <span>{formatDate(selectedItem.vencimento)}</span>
                      </div>
                      {selectedItem.status === "vencido" && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Dias Atraso</span>
                          <span className="text-destructive font-bold">{selectedItem.diasAtraso}</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <div className="flex gap-2">
                    <Button className={`flex-1 ${selectedItem.status === "vencido" ? "bg-destructive" : ""}`}>
                      <CreditCard className="w-4 h-4 mr-2" />
                      Pagar Agora
                    </Button>
                    {selectedItem.status === "vencido" && (
                      <Button variant="outline" className="flex-1 bg-transparent">
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        Escalar
                      </Button>
                    )}
                  </div>
                </div>
              </>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

export default function FinanceiroObraPage() {
  return (
    <Suspense fallback={null}>
      <FinanceiroContent />
    </Suspense>
  )
}
