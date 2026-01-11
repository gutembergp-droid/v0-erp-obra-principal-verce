"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ObraComercialNavbar } from "../../_components/obra-comercial-navbar"
import {
  Scale,
  TrendingDown,
  Target,
  CheckCircle,
  AlertTriangle,
  X,
  FileText,
  BarChart3,
  Users,
  Truck,
  Calculator,
  ThumbsUp,
  Award,
} from "lucide-react"

// Dados mockados - Cotacao
const cotacaoMock = {
  id: "COT-2025-0089",
  requisicao: "REQ-2025-0142",
  descricao: "Aco CA-50 para fundacoes",
  quantidade: 15000,
  unidade: "kg",
  dataAbertura: "2025-01-06",
  dataFechamento: "2025-01-08",
  status: "em_analise",
  metaPreco: 9.5,
  metaTotal: 142500,
}

const fornecedoresCotacao = [
  {
    id: 1,
    nome: "Gerdau S.A.",
    cnpj: "07.358.761/0001-69",
    precoUnitario: 8.9,
    valorTotal: 133500,
    prazoEntrega: 7,
    condicaoPagamento: "30/60/90 dias",
    qualificado: true,
    melhorPreco: true,
    variacaoMeta: -6.3,
    observacoes: "Fornecedor homologado, entrega fracionada disponivel",
  },
  {
    id: 2,
    nome: "ArcelorMittal Brasil",
    cnpj: "17.469.701/0001-77",
    precoUnitario: 9.2,
    valorTotal: 138000,
    prazoEntrega: 10,
    condicaoPagamento: "30/60 dias",
    qualificado: true,
    melhorPreco: false,
    variacaoMeta: -3.2,
    observacoes: "Material certificado NBR",
  },
  {
    id: 3,
    nome: "Acos Villares",
    cnpj: "60.664.810/0001-74",
    precoUnitario: 9.8,
    valorTotal: 147000,
    prazoEntrega: 5,
    condicaoPagamento: "A vista",
    qualificado: true,
    melhorPreco: false,
    variacaoMeta: 3.2,
    observacoes: "Menor prazo de entrega",
  },
]

// Calculo do envoltorio
const envoltorio = {
  menor: Math.min(...fornecedoresCotacao.map((f) => f.precoUnitario)),
  maior: Math.max(...fornecedoresCotacao.map((f) => f.precoUnitario)),
  media: fornecedoresCotacao.reduce((acc, f) => acc + f.precoUnitario, 0) / fornecedoresCotacao.length,
  meta: cotacaoMock.metaPreco,
}

export default function SuprimentosCotacaoPage() {
  const router = useRouter()
  const [fornecedorSelecionado, setFornecedorSelecionado] = useState<(typeof fornecedoresCotacao)[0] | null>(null)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  const getPositionOnScale = (value: number) => {
    const range = envoltorio.maior - envoltorio.menor
    if (range === 0) return 50
    return ((value - envoltorio.menor) / range) * 100
  }

  return (
    <div className="overflow-auto h-full">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-foreground">Quadro Comparativo de Precos</h1>
                <Badge variant="outline" className="text-xs">
                  SP-05
                </Badge>
              </div>
              <p className="text-muted-foreground mt-1">Analise de cotacoes com envoltorio de minimos</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs font-mono">
                {cotacaoMock.id}
              </Badge>
              <Badge className="bg-amber-500/10 text-amber-600 border border-amber-500/20">Em Analise</Badge>
            </div>
          </div>

          {/* Navegacao */}
          <div className="flex items-center gap-2 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              className="text-xs bg-transparent"
              onClick={() => router.push("/obra/comercial/suprimentos-visao")}
            >
              <BarChart3 className="w-3 h-3 mr-2" />
              SP-01 Visao Geral
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs bg-transparent"
              onClick={() => router.push("/obra/comercial/suprimentos-pedidos")}
            >
              <Truck className="w-3 h-3 mr-2" />
              SP-02 Pedidos
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs bg-transparent"
              onClick={() => router.push("/obra/comercial/suprimentos-fornecedores")}
            >
              <Users className="w-3 h-3 mr-2" />
              SP-03 Fornecedores
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs bg-muted/50"
              onClick={() => router.push("/obra/comercial/suprimentos-cotacao")}
            >
              <Scale className="w-3 h-3 mr-2" />
              SP-05 Cotacao
            </Button>
          </div>
        </div>

        {/* Resumo da Cotacao */}
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Requisicao</p>
                <p className="font-mono text-sm">{cotacaoMock.requisicao}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Descricao</p>
                <p className="font-medium">{cotacaoMock.descricao}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Quantidade</p>
                <p className="font-medium">
                  {cotacaoMock.quantidade.toLocaleString()} {cotacaoMock.unidade}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Meta de Preco</p>
                <p className="font-medium text-primary">
                  {formatCurrency(cotacaoMock.metaPreco)}/{cotacaoMock.unidade}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Meta Total</p>
                <p className="font-medium text-primary">{formatCurrency(cotacaoMock.metaTotal)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Grafico Envoltorio de Minimos */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Scale className="w-4 h-4 text-muted-foreground" />
              Envoltorio de Minimos - Analise de Posicionamento
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Escala Visual */}
            <div className="relative pt-8 pb-4">
              {/* Barra de fundo */}
              <div className="relative h-8 bg-gradient-to-r from-emerald-500/20 via-amber-500/20 to-destructive/20 rounded-lg">
                {/* Marcadores de extremos */}
                <div className="absolute -top-6 left-0 text-center">
                  <p className="text-xs text-muted-foreground">Menor</p>
                  <p className="text-sm font-bold text-emerald-500">{formatCurrency(envoltorio.menor)}</p>
                </div>
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-center">
                  <p className="text-xs text-muted-foreground">Media</p>
                  <p className="text-sm font-bold text-amber-500">{formatCurrency(envoltorio.media)}</p>
                </div>
                <div className="absolute -top-6 right-0 text-center">
                  <p className="text-xs text-muted-foreground">Maior</p>
                  <p className="text-sm font-bold text-destructive">{formatCurrency(envoltorio.maior)}</p>
                </div>

                {/* Linha da Meta */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-primary z-10"
                  style={{ left: `${getPositionOnScale(envoltorio.meta)}%` }}
                >
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-primary rounded-full" />
                  <div className="absolute top-10 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <Badge className="bg-primary text-primary-foreground">
                      Meta: {formatCurrency(envoltorio.meta)}
                    </Badge>
                  </div>
                </div>

                {/* Marcadores dos Fornecedores */}
                {fornecedoresCotacao.map((fornecedor, index) => (
                  <div
                    key={fornecedor.id}
                    className="absolute top-1/2 -translate-y-1/2 cursor-pointer group"
                    style={{ left: `${getPositionOnScale(fornecedor.precoUnitario)}%` }}
                    onClick={() => setFornecedorSelecionado(fornecedor)}
                  >
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-transform group-hover:scale-125 ${
                        fornecedor.melhorPreco
                          ? "bg-emerald-500 border-emerald-600 text-white"
                          : "bg-card border-border text-foreground"
                      }`}
                    >
                      {index + 1}
                    </div>
                    {fornecedor.melhorPreco && <Award className="absolute -top-3 -right-2 w-4 h-4 text-amber-500" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Legenda */}
            <div className="flex items-center justify-center gap-6 text-sm">
              {fornecedoresCotacao.map((fornecedor, index) => (
                <div key={fornecedor.id} className="flex items-center gap-2">
                  <div
                    className={`w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold ${
                      fornecedor.melhorPreco ? "bg-emerald-500 text-white" : "bg-muted text-foreground"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span className="text-muted-foreground">{fornecedor.nome.split(" ")[0]}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tabela Comparativa */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Quadro Comparativo de Fornecedores</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left p-3 font-medium text-muted-foreground">Fornecedor</th>
                    <th className="text-right p-3 font-medium text-muted-foreground">Preco Unit.</th>
                    <th className="text-right p-3 font-medium text-muted-foreground">Valor Total</th>
                    <th className="text-center p-3 font-medium text-muted-foreground">vs Meta</th>
                    <th className="text-center p-3 font-medium text-muted-foreground">Prazo</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">Pagamento</th>
                    <th className="text-center p-3 font-medium text-muted-foreground">Status</th>
                    <th className="text-center p-3 font-medium text-muted-foreground">Acao</th>
                  </tr>
                </thead>
                <tbody>
                  {fornecedoresCotacao.map((fornecedor) => (
                    <tr
                      key={fornecedor.id}
                      className={`border-b border-border hover:bg-muted/20 transition-colors cursor-pointer ${
                        fornecedor.melhorPreco ? "bg-emerald-500/5" : ""
                      }`}
                      onClick={() => setFornecedorSelecionado(fornecedor)}
                    >
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          {fornecedor.melhorPreco && <Award className="w-4 h-4 text-amber-500" />}
                          <div>
                            <p className="font-medium text-foreground">{fornecedor.nome}</p>
                            <p className="text-xs text-muted-foreground">{fornecedor.cnpj}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 text-right">
                        <span
                          className={`font-medium ${fornecedor.melhorPreco ? "text-emerald-500" : "text-foreground"}`}
                        >
                          {formatCurrency(fornecedor.precoUnitario)}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <span
                          className={`font-bold ${fornecedor.melhorPreco ? "text-emerald-500" : "text-foreground"}`}
                        >
                          {formatCurrency(fornecedor.valorTotal)}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <Badge
                          className={`${
                            fornecedor.variacaoMeta < 0
                              ? "bg-emerald-500/10 text-emerald-600"
                              : "bg-destructive/10 text-destructive"
                          }`}
                        >
                          {fornecedor.variacaoMeta > 0 ? "+" : ""}
                          {fornecedor.variacaoMeta.toFixed(1)}%
                        </Badge>
                      </td>
                      <td className="p-3 text-center">
                        <span className="text-foreground">{fornecedor.prazoEntrega} dias</span>
                      </td>
                      <td className="p-3 text-sm text-muted-foreground">{fornecedor.condicaoPagamento}</td>
                      <td className="p-3 text-center">
                        {fornecedor.qualificado ? (
                          <Badge className="bg-primary/10 text-primary">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Qualificado
                          </Badge>
                        ) : (
                          <Badge className="bg-destructive/10 text-destructive">
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            Pendente
                          </Badge>
                        )}
                      </td>
                      <td className="p-3 text-center">
                        <Button
                          size="sm"
                          className={
                            fornecedor.melhorPreco
                              ? "bg-emerald-500 text-white hover:bg-emerald-600"
                              : "bg-primary text-primary-foreground"
                          }
                        >
                          {fornecedor.melhorPreco ? "Selecionar" : "Ver Detalhe"}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Resumo da Analise */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-emerald-500/5 border-emerald-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10">
                  <TrendingDown className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Menor Preco</p>
                  <p className="text-lg font-bold text-emerald-500">{formatCurrency(envoltorio.menor)}</p>
                  <p className="text-xs text-muted-foreground">Gerdau S.A.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Target className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Economia vs Meta</p>
                  <p className="text-lg font-bold text-primary">
                    {formatCurrency(cotacaoMock.metaTotal - fornecedoresCotacao[0].valorTotal)}
                  </p>
                  <p className="text-xs text-muted-foreground">6.3% abaixo da meta</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-muted">
                  <Calculator className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Cotacoes Recebidas</p>
                  <p className="text-lg font-bold text-foreground">{fornecedoresCotacao.length} de 3</p>
                  <p className="text-xs text-primary">Minimo atingido</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Acoes */}
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-3">
              <Button className="bg-emerald-500 text-white hover:bg-emerald-600">
                <ThumbsUp className="w-4 h-4 mr-2" />
                Aprovar Menor Preco
              </Button>
              <Button variant="outline" className="bg-transparent">
                <FileText className="w-4 h-4 mr-2" />
                Justificar Escolha
              </Button>
              <Button variant="outline" className="bg-transparent">
                <Calculator className="w-4 h-4 mr-2" />
                Solicitar Nova Cotacao
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Painel Lateral - Detalhe Fornecedor */}
      {fornecedorSelecionado && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-background/80" onClick={() => setFornecedorSelecionado(null)} />
          <div className="relative w-full max-w-md bg-card border-l border-border shadow-lg overflow-auto">
            <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between z-10">
              <div>
                <h3 className="font-semibold text-foreground">Detalhe do Fornecedor</h3>
                {fornecedorSelecionado.melhorPreco && (
                  <Badge className="bg-emerald-500/10 text-emerald-600 mt-1">
                    <Award className="w-3 h-3 mr-1" />
                    Melhor Preco
                  </Badge>
                )}
              </div>
              <Button variant="ghost" size="icon" onClick={() => setFornecedorSelecionado(null)}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="p-4 space-y-6">
              <div>
                <p className="text-sm text-muted-foreground">Razao Social</p>
                <p className="font-medium text-foreground">{fornecedorSelecionado.nome}</p>
                <p className="text-xs text-muted-foreground">{fornecedorSelecionado.cnpj}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="text-xs text-muted-foreground">Preco Unitario</p>
                  <p
                    className={`text-lg font-bold ${fornecedorSelecionado.melhorPreco ? "text-emerald-500" : "text-foreground"}`}
                  >
                    {formatCurrency(fornecedorSelecionado.precoUnitario)}
                  </p>
                </div>
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="text-xs text-muted-foreground">Valor Total</p>
                  <p
                    className={`text-lg font-bold ${fornecedorSelecionado.melhorPreco ? "text-emerald-500" : "text-foreground"}`}
                  >
                    {formatCurrency(fornecedorSelecionado.valorTotal)}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="text-sm text-muted-foreground">Variacao vs Meta</span>
                  <Badge
                    className={`${
                      fornecedorSelecionado.variacaoMeta < 0
                        ? "bg-emerald-500/10 text-emerald-600"
                        : "bg-destructive/10 text-destructive"
                    }`}
                  >
                    {fornecedorSelecionado.variacaoMeta > 0 ? "+" : ""}
                    {fornecedorSelecionado.variacaoMeta.toFixed(1)}%
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="text-sm text-muted-foreground">Prazo de Entrega</span>
                  <span className="font-medium">{fornecedorSelecionado.prazoEntrega} dias</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="text-sm text-muted-foreground">Condicao de Pagamento</span>
                  <span className="font-medium">{fornecedorSelecionado.condicaoPagamento}</span>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Observacoes</p>
                <p className="text-sm bg-muted/30 p-3 rounded-lg">{fornecedorSelecionado.observacoes}</p>
              </div>

              <div className="pt-4 border-t border-border space-y-2">
                <Button className="w-full bg-emerald-500 text-white hover:bg-emerald-600">
                  <ThumbsUp className="w-4 h-4 mr-2" />
                  Selecionar Fornecedor
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <FileText className="w-4 h-4 mr-2" />
                  Ver Proposta Completa
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
