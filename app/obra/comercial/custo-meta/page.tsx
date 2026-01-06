"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Calculator,
  TrendingUp,
  TrendingDown,
  Target,
  AlertTriangle,
  CheckCircle,
  ChevronRight,
  BarChart3,
  FileText,
  History,
  X,
} from "lucide-react"

// Dados mockados
const resumoExecutivo = {
  custoBaseline: 45680000,
  custoRealizado: 47250000,
  desvioCusto: 1570000,
  desvioPercentual: 3.44,
  metaEconomica: 44500000,
  eficienciaEconomica: 0.94,
}

const comparativoPacotes = [
  {
    id: 1,
    pacote: "Terraplanagem",
    planejado: 8500000,
    realizado: 8750000,
    desvio: 250000,
    desvioPercent: 2.94,
    status: "atencao",
  },
  {
    id: 2,
    pacote: "Drenagem",
    planejado: 6200000,
    realizado: 5980000,
    desvio: -220000,
    desvioPercent: -3.55,
    status: "ok",
  },
  {
    id: 3,
    pacote: "Pavimentacao",
    planejado: 12500000,
    realizado: 13200000,
    desvio: 700000,
    desvioPercent: 5.6,
    status: "critico",
  },
  {
    id: 4,
    pacote: "OAE - Pontes",
    planejado: 9800000,
    realizado: 10100000,
    desvio: 300000,
    desvioPercent: 3.06,
    status: "atencao",
  },
  {
    id: 5,
    pacote: "Sinalizacao",
    planejado: 3200000,
    realizado: 3150000,
    desvio: -50000,
    desvioPercent: -1.56,
    status: "ok",
  },
  {
    id: 6,
    pacote: "Indireto",
    planejado: 5480000,
    realizado: 6070000,
    desvio: 590000,
    desvioPercent: 10.77,
    status: "critico",
  },
]

const analiseDesempenho = {
  dentroMeta: 2,
  foraMeta: 4,
  impactoTotal: 1570000,
  tendencia: "piora",
}

const desviosRelevantes = [
  {
    id: 1,
    servico: "Pavimentacao - CBUQ",
    tipo: "Produtividade",
    impacto: 450000,
    situacao: "em_analise",
  },
  {
    id: 2,
    servico: "Indireto - Manutencao",
    tipo: "Escopo",
    impacto: 320000,
    situacao: "pendente",
  },
  {
    id: 3,
    servico: "OAE - Concreto Estrutural",
    tipo: "Insumo",
    impacto: 180000,
    situacao: "justificado",
  },
]

export default function CustoMetaPage() {
  const [competencia, setCompetencia] = useState("2025-01")
  const [statusPeriodo] = useState("Em Analise")
  const [desvioSelecionado, setDesvioSelecionado] = useState<(typeof desviosRelevantes)[0] | null>(null)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ok":
        return (
          <Badge variant="outline" className="border-primary/30 bg-primary/5 text-primary">
            OK
          </Badge>
        )
      case "atencao":
        return (
          <Badge variant="outline" className="border-accent-foreground/30 bg-accent/10 text-accent-foreground">
            Atencao
          </Badge>
        )
      case "critico":
        return (
          <Badge variant="outline" className="border-destructive/30 bg-destructive/10 text-destructive">
            Critico
          </Badge>
        )
      default:
        return null
    }
  }

  const getSituacaoBadge = (situacao: string) => {
    switch (situacao) {
      case "em_analise":
        return (
          <Badge variant="outline" className="border-primary/30 bg-primary/5 text-primary">
            Em Analise
          </Badge>
        )
      case "justificado":
        return (
          <Badge variant="outline" className="border-muted-foreground/30 bg-muted text-muted-foreground">
            Justificado
          </Badge>
        )
      case "pendente":
        return (
          <Badge variant="outline" className="border-destructive/30 bg-destructive/10 text-destructive">
            Pendente
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex-1 overflow-auto bg-background">
      <div className="p-6 space-y-6">
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-foreground">Custo & Meta</h1>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                CM-01
              </Badge>
            </div>
            <p className="text-muted-foreground mt-1">Performance economica da obra</p>
          </div>

          <div className="flex items-center gap-3">
            <Select value={competencia} onValueChange={setCompetencia}>
              <SelectTrigger className="w-[160px] bg-card border-border">
                <SelectValue placeholder="Competencia" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2025-01">Janeiro 2025</SelectItem>
                <SelectItem value="2024-12">Dezembro 2024</SelectItem>
                <SelectItem value="2024-11">Novembro 2024</SelectItem>
              </SelectContent>
            </Select>

            <Badge
              variant="outline"
              className="px-3 py-1.5 border-accent-foreground/30 bg-accent/10 text-accent-foreground"
            >
              {statusPeriodo}
            </Badge>
          </div>
        </div>

        {/* BLOCO 1 - RESUMO EXECUTIVO DE CUSTO */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <Card className="bg-card border-border hover:border-primary/30 transition-colors cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Custo Baseline</p>
                  <p className="text-lg font-bold text-foreground mt-1">
                    {formatCurrency(resumoExecutivo.custoBaseline)}
                  </p>
                </div>
                <div className="p-2 rounded-lg bg-muted">
                  <Target className="w-4 h-4 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border hover:border-primary/30 transition-colors cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Custo Realizado</p>
                  <p className="text-lg font-bold text-foreground mt-1">
                    {formatCurrency(resumoExecutivo.custoRealizado)}
                  </p>
                </div>
                <div className="p-2 rounded-lg bg-muted">
                  <Calculator className="w-4 h-4 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border hover:border-primary/30 transition-colors cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Desvio de Custo</p>
                  <p className="text-lg font-bold text-destructive mt-1">
                    {formatCurrency(resumoExecutivo.desvioCusto)}
                  </p>
                  <p className="text-xs text-destructive">+{resumoExecutivo.desvioPercentual.toFixed(2)}%</p>
                </div>
                <div className="p-2 rounded-lg bg-destructive/10">
                  <TrendingUp className="w-4 h-4 text-destructive" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border hover:border-primary/30 transition-colors cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Meta Economica</p>
                  <p className="text-lg font-bold text-foreground mt-1">
                    {formatCurrency(resumoExecutivo.metaEconomica)}
                  </p>
                </div>
                <div className="p-2 rounded-lg bg-muted">
                  <Target className="w-4 h-4 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border hover:border-primary/30 transition-colors cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Eficiencia (F/CD)</p>
                  <p className="text-lg font-bold text-foreground mt-1">
                    {(resumoExecutivo.eficienciaEconomica * 100).toFixed(1)}%
                  </p>
                </div>
                <div className="p-2 rounded-lg bg-muted">
                  <BarChart3 className="w-4 h-4 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* BLOCO 2 - COMPARATIVO PLANEJADO x REALIZADO */}
          <div className="lg:col-span-2">
            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold text-foreground">
                  Comparativo Planejado x Realizado
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border bg-muted/30">
                        <th className="text-left p-3 font-medium text-muted-foreground">Pacote de Servico</th>
                        <th className="text-right p-3 font-medium text-muted-foreground">Planejado</th>
                        <th className="text-right p-3 font-medium text-muted-foreground">Realizado</th>
                        <th className="text-right p-3 font-medium text-muted-foreground">Desvio</th>
                        <th className="text-right p-3 font-medium text-muted-foreground">%</th>
                        <th className="text-center p-3 font-medium text-muted-foreground">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparativoPacotes.map((pacote) => (
                        <tr key={pacote.id} className="border-b border-border hover:bg-muted/20 transition-colors">
                          <td className="p-3 font-medium text-foreground">{pacote.pacote}</td>
                          <td className="p-3 text-right text-muted-foreground">{formatCurrency(pacote.planejado)}</td>
                          <td className="p-3 text-right text-foreground">{formatCurrency(pacote.realizado)}</td>
                          <td
                            className={`p-3 text-right font-medium ${pacote.desvio > 0 ? "text-destructive" : "text-primary"}`}
                          >
                            {pacote.desvio > 0 ? "+" : ""}
                            {formatCurrency(pacote.desvio)}
                          </td>
                          <td
                            className={`p-3 text-right font-medium ${pacote.desvioPercent > 0 ? "text-destructive" : "text-primary"}`}
                          >
                            {pacote.desvioPercent > 0 ? "+" : ""}
                            {pacote.desvioPercent.toFixed(2)}%
                          </td>
                          <td className="p-3 text-center">{getStatusBadge(pacote.status)}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-muted/50 font-semibold">
                        <td className="p-3 text-foreground">TOTAL</td>
                        <td className="p-3 text-right text-foreground">
                          {formatCurrency(resumoExecutivo.custoBaseline)}
                        </td>
                        <td className="p-3 text-right text-foreground">
                          {formatCurrency(resumoExecutivo.custoRealizado)}
                        </td>
                        <td className="p-3 text-right text-destructive">
                          +{formatCurrency(resumoExecutivo.desvioCusto)}
                        </td>
                        <td className="p-3 text-right text-destructive">
                          +{resumoExecutivo.desvioPercentual.toFixed(2)}%
                        </td>
                        <td className="p-3"></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* BLOCO 3 - ANALISE DE DESEMPENHO */}
          <div className="space-y-4">
            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold text-foreground">Analise de Desempenho</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span className="text-sm text-muted-foreground">Dentro da meta</span>
                  </div>
                  <span className="text-lg font-bold text-primary">{analiseDesempenho.dentroMeta}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-destructive" />
                    <span className="text-sm text-muted-foreground">Fora da meta</span>
                  </div>
                  <span className="text-lg font-bold text-destructive">{analiseDesempenho.foraMeta}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Calculator className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Impacto total</span>
                  </div>
                  <span className="text-lg font-bold text-destructive">
                    {formatCurrency(analiseDesempenho.impactoTotal)}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-destructive/5 rounded-lg border border-destructive/20">
                  <div className="flex items-center gap-2">
                    <TrendingDown className="w-4 h-4 text-destructive" />
                    <span className="text-sm text-muted-foreground">Tendencia</span>
                  </div>
                  <Badge variant="outline" className="border-destructive/30 bg-destructive/10 text-destructive">
                    Piora
                  </Badge>
                </div>

                <p className="text-xs text-muted-foreground italic border-l-2 border-primary/30 pl-3">
                  "Desvio de custo exige analise e decisao."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* BLOCO 4 - DESVIOS RELEVANTES */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold text-foreground">Desvios Relevantes</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left p-3 font-medium text-muted-foreground">Servico</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">Tipo de Desvio</th>
                    <th className="text-right p-3 font-medium text-muted-foreground">Impacto</th>
                    <th className="text-center p-3 font-medium text-muted-foreground">Situacao</th>
                    <th className="text-center p-3 font-medium text-muted-foreground">Acao</th>
                  </tr>
                </thead>
                <tbody>
                  {desviosRelevantes.map((desvio) => (
                    <tr key={desvio.id} className="border-b border-border hover:bg-muted/20 transition-colors">
                      <td className="p-3 font-medium text-foreground">{desvio.servico}</td>
                      <td className="p-3 text-muted-foreground">{desvio.tipo}</td>
                      <td className="p-3 text-right text-destructive font-medium">{formatCurrency(desvio.impacto)}</td>
                      <td className="p-3 text-center">{getSituacaoBadge(desvio.situacao)}</td>
                      <td className="p-3 text-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-primary hover:text-primary hover:bg-primary/10"
                          onClick={() => setDesvioSelecionado(desvio)}
                        >
                          Analisar
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* BLOCO FINAL - NAVEGACAO DO SETOR */}
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" className="border-border hover:bg-muted hover:border-primary/30 bg-transparent">
                <FileText className="w-4 h-4 mr-2" />
                Detalhe por Servico
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" className="border-border hover:bg-muted hover:border-primary/30 bg-transparent">
                <Target className="w-4 h-4 mr-2" />
                Metas Economicas
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" className="border-border hover:bg-muted hover:border-primary/30 bg-transparent">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Analise de Desvios
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" className="border-border hover:bg-muted hover:border-primary/30 bg-transparent">
                <History className="w-4 h-4 mr-2" />
                Historico de Custo
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* PAINEL LATERAL - DETALHE DO DESVIO */}
      {desvioSelecionado && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-background/80" onClick={() => setDesvioSelecionado(null)} />
          <div className="relative w-full max-w-md bg-card border-l border-border shadow-lg overflow-y-auto">
            <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Detalhe do Desvio</h3>
              <Button variant="ghost" size="icon" onClick={() => setDesvioSelecionado(null)}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">Detalhe do Desvio</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setDesvioSelecionado(null)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground">Servico</p>
                  <p className="font-medium text-foreground">{desvioSelecionado.servico}</p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">Tipo de Desvio</p>
                  <p className="font-medium text-foreground">{desvioSelecionado.tipo}</p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">Impacto Financeiro</p>
                  <p className="text-lg font-bold text-destructive">{formatCurrency(desvioSelecionado.impacto)}</p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">Situacao</p>
                  <div className="mt-1">{getSituacaoBadge(desvioSelecionado.situacao)}</div>
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-2">Descricao</p>
                  <p className="text-sm text-muted-foreground">
                    Desvio identificado na execucao do servico, impactando o custo previsto no baseline. Requer analise
                    detalhada para definicao de tratativa.
                  </p>
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-2">Justificativa</p>
                  <p className="text-sm text-muted-foreground">
                    Aumento de produtividade abaixo do esperado devido a condicoes climaticas adversas no periodo.
                  </p>
                </div>

                <div className="pt-4 border-t border-border space-y-2">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    Registrar Tratativa
                  </Button>
                  <Button variant="outline" className="w-full border-border hover:bg-muted bg-transparent">
                    Ver Historico
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
