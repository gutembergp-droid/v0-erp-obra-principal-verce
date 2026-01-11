"use client"

import { useState, Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { InfoTooltip } from "@/components/ui/info-tooltip"
import { ObraComercialNavbar } from "../../_components/obra-comercial-navbar"
import {
  FileText,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Calendar,
  Receipt,
  Upload,
  CreditCard,
  FileWarning,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  ChevronRight,
  Download,
  Filter,
} from "lucide-react"

const resumoFinanceiro = {
  valorAprovado: 4250000,
  faturadoPeriodo: 3079500,
  faturadoAcumulado: 28750000,
  valorRecebido: 25670500,
  saldoAReceber: 3079500,
  valorEmAtraso: 850000,
  percentualRecebido: 89.3,
  percentualAtraso: 2.9,
}

const faturamentoMock = [
  {
    id: 1,
    numero: "NF-2026/001",
    dataEmissao: "2026-01-05",
    valorFaturado: 3079500,
    impostos: 184770,
    valorLiquido: 2894730,
    status: "emitida",
    observacoes: "Referente medicao M12",
    medicao: "M12 - Janeiro/2026",
    itens: [
      { servico: "Terraplanagem", valor: 1200000, quantidade: "45.000 m³" },
      { servico: "Drenagem", valor: 850000, quantidade: "1.200 m" },
      { servico: "Pavimentacao", valor: 1029500, quantidade: "8.500 m²" },
    ],
  },
  {
    id: 2,
    numero: "NF-2025/012",
    dataEmissao: "2025-12-05",
    valorFaturado: 4250000,
    impostos: 255000,
    valorLiquido: 3995000,
    status: "aceita",
    observacoes: "Referente medicao M11",
    medicao: "M11 - Dezembro/2025",
    itens: [
      { servico: "Terraplanagem", valor: 1500000, quantidade: "55.000 m³" },
      { servico: "OAE - Pontes", valor: 1800000, quantidade: "Etapa 3" },
      { servico: "Sinalizacao", valor: 950000, quantidade: "12 km" },
    ],
  },
  {
    id: 3,
    numero: "NF-2025/011",
    dataEmissao: "2025-11-05",
    valorFaturado: 3800000,
    impostos: 228000,
    valorLiquido: 3572000,
    status: "aceita",
    observacoes: "Referente medicao M10",
    medicao: "M10 - Novembro/2025",
    itens: [
      { servico: "Drenagem", valor: 1200000, quantidade: "2.500 m" },
      { servico: "Pavimentacao", valor: 2600000, quantidade: "22.000 m²" },
    ],
  },
  {
    id: 4,
    numero: "NF-2025/010",
    dataEmissao: "2025-10-05",
    valorFaturado: 3200000,
    impostos: 192000,
    valorLiquido: 3008000,
    status: "contestada",
    observacoes: "Cliente contestou item 3.2",
    medicao: "M09 - Outubro/2025",
    itens: [
      { servico: "Terraplanagem", valor: 1800000, quantidade: "65.000 m³" },
      { servico: "Drenagem", valor: 1400000, quantidade: "3.000 m" },
    ],
    contestacao: {
      item: "Item 3.2 - Drenagem Trecho B",
      motivo: "Divergencia na quantidade medida",
      valorContestado: 350000,
      dataContestacao: "2025-10-15",
    },
  },
]

const contasAReceber = [
  {
    id: 1,
    documento: "NF-2026/001",
    cliente: "DNIT",
    vencimento: "2026-02-05",
    valor: 2894730,
    status: "a_vencer",
    diasAtraso: 0,
    diasParaVencer: 30,
  },
  {
    id: 2,
    documento: "NF-2025/012",
    cliente: "DNIT",
    vencimento: "2026-01-05",
    valor: 3995000,
    status: "pago",
    diasAtraso: 0,
    dataPagamento: "2026-01-03",
  },
  {
    id: 3,
    documento: "NF-2025/011",
    cliente: "DNIT",
    vencimento: "2025-12-05",
    valor: 3572000,
    status: "pago",
    diasAtraso: 0,
    dataPagamento: "2025-12-08",
  },
  {
    id: 4,
    documento: "NF-2025/010",
    cliente: "DNIT",
    vencimento: "2025-11-05",
    valor: 850000,
    status: "em_atraso",
    diasAtraso: 61,
    motivo: "Aguardando resolucao de contestacao",
  },
]

const analiseRecebimento = {
  prazoMedio: 32,
  percentualRecebido: 89.3,
  percentualEmAtraso: 2.9,
  tendenciaInadimplencia: "estavel",
  historicoMeses: [
    { mes: "Set", recebido: 95.2 },
    { mes: "Out", recebido: 92.1 },
    { mes: "Nov", recebido: 88.5 },
    { mes: "Dez", recebido: 91.2 },
    { mes: "Jan", recebido: 89.3 },
  ],
}

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

function FaturamentoContent() {
  const [selectedNF, setSelectedNF] = useState<any>(null)
  const [selectedConta, setSelectedConta] = useState<any>(null)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [sheetType, setSheetType] = useState<"nf" | "conta">("nf")

  const handleSelectNF = (nf: any) => {
    setSelectedNF(nf)
    setSheetType("nf")
    setSheetOpen(true)
  }

  const handleSelectConta = (conta: any) => {
    setSelectedConta(conta)
    setSheetType("conta")
    setSheetOpen(true)
  }

  const getStatusFaturamentoBadge = (status: string) => {
    switch (status) {
      case "emitida":
        return (
          <Badge variant="outline" className="bg-muted/50">
            Emitida
          </Badge>
        )
      case "enviada":
        return (
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
            Enviada
          </Badge>
        )
      case "aceita":
        return (
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
            Aceita
          </Badge>
        )
      case "contestada":
        return (
          <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/30">
            Contestada
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getStatusContaBadge = (status: string, diasAtraso: number) => {
    switch (status) {
      case "a_vencer":
        return (
          <Badge variant="outline" className="bg-muted/50">
            A Vencer
          </Badge>
        )
      case "pago":
        return (
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
            Pago
          </Badge>
        )
      case "em_atraso":
        return (
          <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/30">
            {diasAtraso}d atraso
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="flex flex-col h-screen bg-muted/30 overflow-hidden">
      <div className="flex-shrink-0 z-40 mt-0">
        <ObraComercialNavbar />
      </div>

      <main className="flex-1 bg-background overflow-hidden p-6">
        <div className="h-full border-0 bg-background overflow-y-auto overflow-x-hidden scrollbar-hide p-6" style={{ borderRadius: '25px', boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.13), 0 2px 8px rgba(0, 0, 0, 0.05)', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div className="space-y-6">
            {/* Header */}
        <div className="flex items-center justify-between mb-4 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 border border-primary/20">
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-foreground">Faturamento & A Receber</h1>
                <Badge variant="outline" className="text-xs">
                  RM-04
                </Badge>
                <InfoTooltip
                  title="Faturamento & A Receber"
                  description="Execucao do ciclo financeiro. Acompanhe NFs emitidas, contas a receber e inadimplencia."
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
              <Filter className="w-4 h-4 mr-2" />
              Filtrar
            </Button>
            <Button size="sm">
              <Receipt className="w-4 h-4 mr-2" />
              Emitir NF
            </Button>
          </div>
        </div>

        {/* Resumo Financeiro */}
        <div className="grid grid-cols-6 gap-3 mb-4 flex-shrink-0">
          <Card className="border-border/50">
            <CardContent className="p-3 text-center">
              <div className="flex items-center justify-center w-8 h-8 mx-auto mb-1 rounded-lg bg-muted/50">
                <FileText className="w-4 h-4 text-muted-foreground" />
              </div>
              <p className="text-lg font-bold">{formatCurrency(resumoFinanceiro.valorAprovado)}</p>
              <p className="text-xs text-muted-foreground">Aprovado p/ Fat.</p>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="p-3 text-center">
              <div className="flex items-center justify-center w-8 h-8 mx-auto mb-1 rounded-lg bg-primary/10">
                <Receipt className="w-4 h-4 text-primary" />
              </div>
              <p className="text-lg font-bold text-primary">{formatCurrency(resumoFinanceiro.faturadoPeriodo)}</p>
              <p className="text-xs text-muted-foreground">Faturado Periodo</p>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="p-3 text-center">
              <div className="flex items-center justify-center w-8 h-8 mx-auto mb-1 rounded-lg bg-muted/50">
                <DollarSign className="w-4 h-4 text-muted-foreground" />
              </div>
              <p className="text-lg font-bold">{formatCurrency(resumoFinanceiro.faturadoAcumulado)}</p>
              <p className="text-xs text-muted-foreground">Fat. Acumulado</p>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="p-3 text-center">
              <div className="flex items-center justify-center w-8 h-8 mx-auto mb-1 rounded-lg bg-primary/10">
                <CheckCircle className="w-4 h-4 text-primary" />
              </div>
              <p className="text-lg font-bold text-primary">{formatCurrency(resumoFinanceiro.valorRecebido)}</p>
              <p className="text-xs text-muted-foreground">Recebido</p>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="p-3 text-center">
              <div className="flex items-center justify-center w-8 h-8 mx-auto mb-1 rounded-lg bg-accent/10">
                <Clock className="w-4 h-4 text-accent-foreground" />
              </div>
              <p className="text-lg font-bold text-accent-foreground">
                {formatCurrency(resumoFinanceiro.saldoAReceber)}
              </p>
              <p className="text-xs text-muted-foreground">A Receber</p>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="p-3 text-center">
              <div className="flex items-center justify-center w-8 h-8 mx-auto mb-1 rounded-lg bg-destructive/10">
                <AlertTriangle className="w-4 h-4 text-destructive" />
              </div>
              <p className="text-lg font-bold text-destructive">{formatCurrency(resumoFinanceiro.valorEmAtraso)}</p>
              <p className="text-xs text-muted-foreground">Em Atraso</p>
            </CardContent>
          </Card>
        </div>

        {/* Conteudo Principal */}
        <div className="flex-1 min-h-0">
          <ScrollArea className="h-full">
            <div className="space-y-4 pr-4">
              {/* Alertas */}
              {resumoFinanceiro.valorEmAtraso > 0 && (
                <Card className="border-destructive/30 bg-destructive/5">
                  <CardContent className="p-3">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-destructive" />
                      <span className="text-sm font-medium text-destructive">
                        {formatCurrency(resumoFinanceiro.valorEmAtraso)} em atraso ({resumoFinanceiro.percentualAtraso}%
                        do faturado)
                      </span>
                      <Button variant="outline" size="sm" className="ml-auto h-7 text-xs bg-transparent">
                        Ver Detalhes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Tabela de Faturamento */}
              <Card className="border-border/50">
                <CardHeader className="py-3">
                  <CardTitle className="flex items-center justify-between text-base">
                    <span>Notas Fiscais Emitidas</span>
                    <Badge variant="outline" className="text-xs">
                      {faturamentoMock.length} NFs
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-muted/30 border-b">
                          <th className="text-left p-2 font-medium text-muted-foreground">Numero</th>
                          <th className="text-left p-2 font-medium text-muted-foreground">Emissao</th>
                          <th className="text-left p-2 font-medium text-muted-foreground">Medicao</th>
                          <th className="text-right p-2 font-medium text-muted-foreground">Valor Bruto</th>
                          <th className="text-right p-2 font-medium text-muted-foreground">Impostos</th>
                          <th className="text-right p-2 font-medium text-muted-foreground">Valor Liquido</th>
                          <th className="text-center p-2 font-medium text-muted-foreground">Status</th>
                          <th className="text-center p-2 font-medium text-muted-foreground w-10"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {faturamentoMock.map((nf) => (
                          <tr
                            key={nf.id}
                            className={`border-b last:border-0 hover:bg-muted/20 cursor-pointer transition-colors ${
                              nf.status === "contestada" ? "bg-destructive/5" : ""
                            }`}
                            onClick={() => handleSelectNF(nf)}
                          >
                            <td className="p-2">
                              <div className="flex items-center gap-2">
                                <FileText className="w-4 h-4 text-muted-foreground" />
                                <span className="font-mono font-medium">{nf.numero}</span>
                              </div>
                            </td>
                            <td className="p-2">{formatDate(nf.dataEmissao)}</td>
                            <td className="p-2 text-muted-foreground">{nf.medicao}</td>
                            <td className="p-2 text-right font-mono">{formatCurrency(nf.valorFaturado)}</td>
                            <td className="p-2 text-right font-mono text-muted-foreground">
                              -{formatCurrency(nf.impostos)}
                            </td>
                            <td className="p-2 text-right font-mono font-bold">{formatCurrency(nf.valorLiquido)}</td>
                            <td className="p-2 text-center">{getStatusFaturamentoBadge(nf.status)}</td>
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

              {/* Tabela Contas a Receber */}
              <Card className="border-border/50">
                <CardHeader className="py-3">
                  <CardTitle className="flex items-center justify-between text-base">
                    <span>Contas a Receber</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs bg-primary/10 text-primary">
                        {resumoFinanceiro.percentualRecebido}% recebido
                      </Badge>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-muted/30 border-b">
                          <th className="text-left p-2 font-medium text-muted-foreground">Documento</th>
                          <th className="text-left p-2 font-medium text-muted-foreground">Cliente</th>
                          <th className="text-left p-2 font-medium text-muted-foreground">Vencimento</th>
                          <th className="text-right p-2 font-medium text-muted-foreground">Valor</th>
                          <th className="text-center p-2 font-medium text-muted-foreground">Status</th>
                          <th className="text-center p-2 font-medium text-muted-foreground">Dias</th>
                          <th className="text-center p-2 font-medium text-muted-foreground w-10"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {contasAReceber.map((conta) => (
                          <tr
                            key={conta.id}
                            className={`border-b last:border-0 hover:bg-muted/20 cursor-pointer transition-colors ${
                              conta.status === "em_atraso" ? "bg-destructive/5" : ""
                            }`}
                            onClick={() => handleSelectConta(conta)}
                          >
                            <td className="p-2">
                              <span className="font-mono font-medium">{conta.documento}</span>
                            </td>
                            <td className="p-2">{conta.cliente}</td>
                            <td className="p-2">{formatDate(conta.vencimento)}</td>
                            <td className="p-2 text-right font-mono font-bold">{formatCurrency(conta.valor)}</td>
                            <td className="p-2 text-center">{getStatusContaBadge(conta.status, conta.diasAtraso)}</td>
                            <td className="p-2 text-center">
                              {conta.status === "em_atraso" ? (
                                <span className="text-destructive font-medium">{conta.diasAtraso}d</span>
                              ) : conta.status === "a_vencer" ? (
                                <span className="text-muted-foreground">{conta.diasParaVencer}d</span>
                              ) : (
                                <span className="text-muted-foreground">-</span>
                              )}
                            </td>
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

              {/* Analise de Recebimento */}
              <Card className="border-border/50">
                <CardHeader className="py-3">
                  <CardTitle className="text-base">Analise de Recebimento</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-4 gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-muted/30 text-center">
                      <p className="text-xs text-muted-foreground mb-1">Prazo Medio</p>
                      <p className="text-xl font-bold">{analiseRecebimento.prazoMedio} dias</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/30 text-center">
                      <p className="text-xs text-muted-foreground mb-1">% Recebido</p>
                      <p className="text-xl font-bold text-primary">{analiseRecebimento.percentualRecebido}%</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/30 text-center">
                      <p className="text-xs text-muted-foreground mb-1">% Em Atraso</p>
                      <p className="text-xl font-bold text-destructive">{analiseRecebimento.percentualEmAtraso}%</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/30 text-center">
                      <p className="text-xs text-muted-foreground mb-1">Tendencia</p>
                      <div className="flex items-center justify-center gap-1">
                        {analiseRecebimento.tendenciaInadimplencia === "crescente" ? (
                          <TrendingUp className="w-5 h-5 text-destructive" />
                        ) : (
                          <TrendingDown className="w-5 h-5 text-primary" />
                        )}
                        <span className="font-bold capitalize">{analiseRecebimento.tendenciaInadimplencia}</span>
                      </div>
                    </div>
                  </div>

                  {/* Historico Visual */}
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">Evolucao % Recebido (ultimos 5 meses)</p>
                    {analiseRecebimento.historicoMeses.map((mes, index) => {
                      const isAtual = index === analiseRecebimento.historicoMeses.length - 1
                      return (
                        <div key={mes.mes} className="flex items-center gap-3">
                          <span className={`text-xs w-8 ${isAtual ? "font-bold" : "text-muted-foreground"}`}>
                            {mes.mes}
                          </span>
                          <div className="flex-1 h-5 bg-muted/30 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${mes.recebido >= 90 ? "bg-primary" : "bg-primary/70"}`}
                              style={{ width: `${mes.recebido}%` }}
                            />
                          </div>
                          <span className={`text-xs w-12 text-right ${isAtual ? "font-bold" : ""}`}>
                            {mes.recebido}%
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Governanca */}
              <Card className="border-accent/30 bg-accent/5">
                <CardContent className="p-3">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-accent-foreground mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Avisos de Governanca</p>
                      <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                        <li>• Faturamento so ocorre apos aprovacao da medicao do cliente</li>
                        <li>• Atrasos acima de 60 dias devem ser escalados ao GC</li>
                        <li>• Contestacoes bloqueiam recebimento ate resolucao</li>
                      </ul>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="h-7 text-xs bg-transparent">
                        <Download className="w-3 h-3 mr-1" />
                        Relatorio
                      </Button>
                      <Button variant="outline" size="sm" className="h-7 text-xs bg-transparent">
                        <FileWarning className="w-3 h-3 mr-1" />
                        Escalar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </ScrollArea>
        </div>

        {/* Painel Lateral */}
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetContent className="w-[450px] sm:max-w-[450px] overflow-y-auto">
            {sheetType === "nf" && selectedNF && (
              <>
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    Detalhe da Nota Fiscal
                  </SheetTitle>
                </SheetHeader>

                <div className="mt-6 space-y-6">
                  {/* Info Principal */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">Numero</p>
                      <p className="text-lg font-bold font-mono">{selectedNF.numero}</p>
                    </div>
                    {getStatusFaturamentoBadge(selectedNF.status)}
                  </div>

                  {/* Valores */}
                  <Card className="border-primary/30 bg-primary/5">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Valor Bruto</span>
                        <span className="font-mono">{formatCurrency(selectedNF.valorFaturado)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Impostos</span>
                        <span className="font-mono text-destructive">-{formatCurrency(selectedNF.impostos)}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-primary/20">
                        <span className="text-sm font-medium">Valor Liquido</span>
                        <span className="font-mono font-bold text-primary">
                          {formatCurrency(selectedNF.valorLiquido)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Informacoes */}
                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="text-sm">Informacoes</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Data Emissao</span>
                        <span>{formatDate(selectedNF.dataEmissao)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Medicao Ref.</span>
                        <span>{selectedNF.medicao}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Observacoes</span>
                        <span>{selectedNF.observacoes}</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Itens */}
                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="text-sm">Composicao</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-2">
                        {selectedNF.itens.map((item: any, index: number) => (
                          <div key={index} className="flex justify-between p-2 rounded-lg bg-muted/30 text-sm">
                            <div>
                              <p className="font-medium">{item.servico}</p>
                              <p className="text-xs text-muted-foreground">{item.quantidade}</p>
                            </div>
                            <span className="font-mono">{formatCurrency(item.valor)}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Contestacao (se houver) */}
                  {selectedNF.contestacao && (
                    <Card className="border-destructive/30 bg-destructive/5">
                      <CardHeader className="py-3">
                        <CardTitle className="text-sm flex items-center gap-2 text-destructive">
                          <XCircle className="w-4 h-4" />
                          Contestacao
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0 space-y-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">Item: </span>
                          <span>{selectedNF.contestacao.item}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Motivo: </span>
                          <span>{selectedNF.contestacao.motivo}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Valor: </span>
                          <span className="text-destructive font-bold">
                            {formatCurrency(selectedNF.contestacao.valorContestado)}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Acoes */}
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 bg-transparent">
                      <Download className="w-4 h-4 mr-2" />
                      Baixar PDF
                    </Button>
                    <Button className="flex-1">Ver Medicao</Button>
                  </div>
                </div>
              </>
            )}

            {sheetType === "conta" && selectedConta && (
              <>
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-primary" />
                    Detalhe da Conta
                  </SheetTitle>
                </SheetHeader>

                <div className="mt-6 space-y-6">
                  {/* Info Principal */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">Documento</p>
                      <p className="text-lg font-bold font-mono">{selectedConta.documento}</p>
                    </div>
                    {getStatusContaBadge(selectedConta.status, selectedConta.diasAtraso)}
                  </div>

                  {/* Valor */}
                  <Card className="border-primary/30 bg-primary/5">
                    <CardContent className="p-4 text-center">
                      <p className="text-sm text-muted-foreground">Valor</p>
                      <p className="text-3xl font-bold text-primary">{formatCurrency(selectedConta.valor)}</p>
                    </CardContent>
                  </Card>

                  {/* Informacoes */}
                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="text-sm">Informacoes</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Cliente</span>
                        <span>{selectedConta.cliente}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Vencimento</span>
                        <span>{formatDate(selectedConta.vencimento)}</span>
                      </div>
                      {selectedConta.dataPagamento && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Data Pagamento</span>
                          <span className="text-primary">{formatDate(selectedConta.dataPagamento)}</span>
                        </div>
                      )}
                      {selectedConta.motivo && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Motivo Atraso</span>
                          <span className="text-destructive">{selectedConta.motivo}</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Acoes */}
                  <div className="flex gap-2">
                    {selectedConta.status === "a_vencer" && (
                      <Button className="flex-1">
                        <CreditCard className="w-4 h-4 mr-2" />
                        Registrar Pagamento
                      </Button>
                    )}
                    {selectedConta.status === "em_atraso" && (
                      <>
                        <Button variant="outline" className="flex-1 bg-transparent">
                          <CreditCard className="w-4 h-4 mr-2" />
                          Registrar Pgto
                        </Button>
                        <Button variant="destructive" className="flex-1">
                          <FileWarning className="w-4 h-4 mr-2" />
                          Escalar
                        </Button>
                      </>
                    )}
                    {selectedConta.status === "pago" && (
                      <Button variant="outline" className="flex-1 bg-transparent">
                        <Upload className="w-4 h-4 mr-2" />
                        Ver Comprovante
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
      </main>
    </div>
  )
}

export default function FaturamentoPage() {
  return (
    <Suspense fallback={null}>
      <FaturamentoContent />
    </Suspense>
  )
}
