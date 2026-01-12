"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Target, TrendingUp, TrendingDown, AlertTriangle, CheckCircle2, FileText, Send, Settings } from "lucide-react"
import { ObraComercialNavbar } from "@/app/obra/_components/obra-comercial-navbar"

// Dados mockados - Metas por Servico
const metasServico = [
  {
    id: 1,
    servico: "Terraplanagem",
    metaRS: 8500000,
    metaPercent: 12.5,
    realizadoRS: 8750000,
    realizadoPercent: 14.2,
    desvioRS: 250000,
    desvioPercent: 2.94,
    status: "atencao",
  },
  {
    id: 2,
    servico: "Drenagem",
    metaRS: 6200000,
    metaPercent: 10.0,
    realizadoRS: 5980000,
    realizadoPercent: 9.1,
    desvioRS: -220000,
    desvioPercent: -3.55,
    status: "ok",
  },
  {
    id: 3,
    servico: "Pavimentacao",
    metaRS: 12500000,
    metaPercent: 8.5,
    realizadoRS: 13200000,
    realizadoPercent: 11.8,
    desvioRS: 700000,
    desvioPercent: 5.6,
    status: "critico",
  },
  {
    id: 4,
    servico: "OAE - Pontes",
    metaRS: 9800000,
    metaPercent: 15.0,
    realizadoRS: 10100000,
    realizadoPercent: 16.2,
    desvioRS: 300000,
    desvioPercent: 3.06,
    status: "atencao",
  },
  {
    id: 5,
    servico: "Sinalizacao",
    metaRS: 3200000,
    metaPercent: 18.0,
    realizadoRS: 3150000,
    realizadoPercent: 17.5,
    desvioRS: -50000,
    desvioPercent: -1.56,
    status: "ok",
  },
  {
    id: 6,
    servico: "Indireto",
    metaRS: 5480000,
    metaPercent: 6.0,
    realizadoRS: 6070000,
    realizadoPercent: 8.5,
    desvioRS: 590000,
    desvioPercent: 10.77,
    status: "critico",
  },
]

// Dados mockados - DRE Simplificado (Metas Globais)
const metasGlobais = [
  { linha: "Receita Bruta", meta: 85000000, realizado: 82500000, desvio: -2500000 },
  { linha: "(-) Impostos e Deducoes", meta: -12750000, realizado: -12375000, desvio: 375000 },
  { linha: "Receita Liquida", meta: 72250000, realizado: 70125000, desvio: -2125000 },
  { linha: "(-) Custo Direto", meta: -45680000, realizado: -47250000, desvio: -1570000 },
  { linha: "(-) Custo Indireto", meta: -5480000, realizado: -6070000, desvio: -590000 },
  { linha: "Margem Bruta", meta: 21090000, realizado: 16805000, desvio: -4285000 },
  { linha: "(-) Despesas Gerais", meta: -3200000, realizado: -3450000, desvio: -250000 },
  { linha: "Margem Operacional", meta: 17890000, realizado: 13355000, desvio: -4535000 },
]

// Parametros e Regras
const parametros = [
  { nome: "Tolerancia de desvio por servico", valor: "5%", descricao: "Acima dispara alerta" },
  { nome: "Tolerancia de desvio global", valor: "3%", descricao: "Acima exige justificativa" },
  { nome: "Limite para ajuste de meta", valor: "10%", descricao: "Acima requer aprovacao GC" },
  { nome: "Frequencia de revisao", valor: "Mensal", descricao: "Revisao obrigatoria" },
]

const formatCurrency = (value: number) => {
  const absValue = Math.abs(value)
  if (absValue >= 1000000) {
    return `R$ ${(value / 1000000).toFixed(1)}M`
  }
  return `R$ ${(value / 1000).toFixed(0)}K`
}

const formatPercent = (value: number) => {
  const sign = value > 0 ? "+" : ""
  return `${sign}${value.toFixed(2)}%`
}

export default function MetasEconomicasPage() {
  const [competencia, setCompetencia] = useState("janeiro-2025")
  const [servicoSelecionado, setServicoSelecionado] = useState<(typeof metasServico)[0] | null>(null)
  const [painelAberto, setPainelAberto] = useState(false)

  const handleAjustarMeta = (servico: (typeof metasServico)[0]) => {
    setServicoSelecionado(servico)
    setPainelAberto(true)
  }

  const totalMeta = metasServico.reduce((acc, s) => acc + s.metaRS, 0)
  const totalRealizado = metasServico.reduce((acc, s) => acc + s.realizadoRS, 0)
  const totalDesvio = totalRealizado - totalMeta

  const servicosOk = metasServico.filter((s) => s.status === "ok").length
  const servicosAtencao = metasServico.filter((s) => s.status === "atencao").length
  const servicosCritico = metasServico.filter((s) => s.status === "critico").length

  return (
    <div className="flex flex-col h-screen bg-muted/30 overflow-hidden">
      <div className="flex-shrink-0 z-40 mt-0">
        <ObraComercialNavbar />
      </div>

      <main className="flex-1 bg-background overflow-hidden p-6">
        <div className="h-full border-0 bg-background overflow-y-auto overflow-x-hidden scrollbar-hide p-6" style={{ borderRadius: '25px', boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.13), 0 2px 8px rgba(0, 0, 0, 0.05)', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-foreground">Metas Economicas</h1>
                  <Badge variant="outline" className="text-xs border-primary/30 text-primary">
                    CM-03
                  </Badge>
                </div>
                <p className="text-muted-foreground text-sm mt-1">Definicao e acompanhamento de metas por obra e servico</p>
              </div>
              <div className="flex items-center gap-3">
                <Select value={competencia} onValueChange={setCompetencia}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="janeiro-2025">Janeiro 2025</SelectItem>
                    <SelectItem value="dezembro-2024">Dezembro 2024</SelectItem>
                    <SelectItem value="novembro-2024">Novembro 2024</SelectItem>
                  </SelectContent>
                </Select>
                <Badge
                  variant="outline"
                  className={
                    servicosCritico > 0
                      ? "border-destructive/30 text-destructive"
                      : servicosAtencao > 0
                        ? "border-primary/30 text-primary"
                        : "border-muted text-muted-foreground"
                  }
                >
                  {servicosCritico > 0 ? "Critico" : servicosAtencao > 0 ? "Atencao" : "Normal"}
                </Badge>
              </div>
            </div>

            {/* Resumo KPIs */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <Card className="bg-card border">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Meta Total</span>
                  </div>
                  <p className="text-lg font-bold text-foreground">{formatCurrency(totalMeta)}</p>
                </CardContent>
              </Card>
              <Card className="bg-card border">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Realizado</span>
                  </div>
                  <p className="text-lg font-bold text-foreground">{formatCurrency(totalRealizado)}</p>
                </CardContent>
              </Card>
              <Card className="bg-card border">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    {totalDesvio > 0 ? (
                      <TrendingDown className="w-4 h-4 text-destructive" />
                    ) : (
                      <TrendingUp className="w-4 h-4 text-primary" />
                    )}
                    <span className="text-xs text-muted-foreground">Desvio</span>
                  </div>
                  <p className={`text-lg font-bold ${totalDesvio > 0 ? "text-destructive" : "text-primary"}`}>
                    {formatCurrency(totalDesvio)}
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-card border">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Dentro Meta</span>
                  </div>
                  <p className="text-lg font-bold text-foreground">{servicosOk}</p>
                </CardContent>
              </Card>
              <Card className="bg-card border">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Fora Meta</span>
                  </div>
                  <p className="text-lg font-bold text-foreground">{servicosAtencao + servicosCritico}</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Tabela de Metas por Servico */}
              <Card className="lg:col-span-2 bg-card border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold text-foreground">Metas por Servico (EAP Custo)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-2 px-2 font-medium text-muted-foreground">Servico</th>
                          <th className="text-right py-2 px-2 font-medium text-muted-foreground">Meta (R$)</th>
                          <th className="text-right py-2 px-2 font-medium text-muted-foreground">Meta (%)</th>
                          <th className="text-right py-2 px-2 font-medium text-muted-foreground">Realizado</th>
                          <th className="text-right py-2 px-2 font-medium text-muted-foreground">Real (%)</th>
                          <th className="text-right py-2 px-2 font-medium text-muted-foreground">Desvio</th>
                          <th className="text-center py-2 px-2 font-medium text-muted-foreground">Status</th>
                          <th className="text-center py-2 px-2 font-medium text-muted-foreground">Acao</th>
                        </tr>
                      </thead>
                      <tbody>
                        {metasServico.map((item) => (
                          <tr key={item.id} className="border-b border-border/50 hover:bg-muted/30">
                            <td className="py-2 px-2 font-medium text-foreground">{item.servico}</td>
                            <td className="py-2 px-2 text-right text-foreground">{formatCurrency(item.metaRS)}</td>
                            <td className="py-2 px-2 text-right text-muted-foreground">{item.metaPercent.toFixed(1)}%</td>
                            <td className="py-2 px-2 text-right text-foreground">{formatCurrency(item.realizadoRS)}</td>
                            <td className="py-2 px-2 text-right text-muted-foreground">
                              {item.realizadoPercent.toFixed(1)}%
                            </td>
                            <td className={`py-2 px-2 text-right ${item.desvioRS > 0 ? "text-destructive" : "text-primary"}`}>
                              {formatPercent(item.desvioPercent)}
                            </td>
                            <td className="py-2 px-2 text-center">
                              <Badge
                                variant="outline"
                                className={
                                  item.status === "ok"
                                    ? "border-primary/30 text-primary bg-primary/5"
                                    : item.status === "atencao"
                                      ? "border-accent-foreground/30 text-accent-foreground bg-accent/10"
                                      : "border-destructive/30 text-destructive bg-destructive/5"
                                }
                              >
                                {item.status === "ok" ? "OK" : item.status === "atencao" ? "Atencao" : "Critico"}
                              </Badge>
                            </td>
                            <td className="py-2 px-2 text-center">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleAjustarMeta(item)}
                                className="h-7 text-xs text-primary hover:text-primary"
                              >
                                Ajustar
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="border-t-2 border-border bg-muted/30">
                          <td className="py-2 px-2 font-bold text-foreground">TOTAL</td>
                          <td className="py-2 px-2 text-right font-bold text-foreground">{formatCurrency(totalMeta)}</td>
                          <td className="py-2 px-2 text-right text-muted-foreground">-</td>
                          <td className="py-2 px-2 text-right font-bold text-foreground">{formatCurrency(totalRealizado)}</td>
                          <td className="py-2 px-2 text-right text-muted-foreground">-</td>
                          <td
                            className={`py-2 px-2 text-right font-bold ${totalDesvio > 0 ? "text-destructive" : "text-primary"}`}
                          >
                            {formatPercent((totalDesvio / totalMeta) * 100)}
                          </td>
                          <td colSpan={2} />
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Parametros e Regras */}
              <Card className="bg-card border">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Settings className="w-4 h-4 text-muted-foreground" />
                    <CardTitle className="text-base font-semibold text-foreground">Parametros & Regras</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {parametros.map((param, idx) => (
                    <div key={idx} className="p-3 bg-muted/30 rounded-lg border border-border/50">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-foreground">{param.nome}</span>
                        <Badge variant="outline" className="text-xs">
                          {param.valor}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{param.descricao}</p>
                    </div>
                  ))}

                  <div className="pt-3 border-t border-border space-y-2">
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      Ajustes de meta acima de 10% requerem aprovacao do GC
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Metas Globais - DRE Simplificado */}
            <Card className="bg-card border">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold text-foreground">
                  Metas Globais da Obra (DRE Simplificado)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Linha</th>
                        <th className="text-right py-2 px-3 font-medium text-muted-foreground">Meta</th>
                        <th className="text-right py-2 px-3 font-medium text-muted-foreground">Realizado</th>
                        <th className="text-right py-2 px-3 font-medium text-muted-foreground">Desvio</th>
                      </tr>
                    </thead>
                    <tbody>
                      {metasGlobais.map((item, idx) => {
                        const isTotal = item.linha.includes("Margem")
                        return (
                          <tr key={idx} className={`border-b border-border/50 ${isTotal ? "bg-muted/30 font-semibold" : ""}`}>
                            <td className={`py-2 px-3 ${isTotal ? "font-bold" : ""} text-foreground`}>{item.linha}</td>
                            <td className="py-2 px-3 text-right text-foreground">{formatCurrency(item.meta)}</td>
                            <td className="py-2 px-3 text-right text-foreground">{formatCurrency(item.realizado)}</td>
                            <td className={`py-2 px-3 text-right ${item.desvio < 0 ? "text-destructive" : "text-primary"}`}>
                              {formatCurrency(item.desvio)}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Acoes de Governanca */}
            <Card className="bg-card border">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold text-foreground">Acoes de Governanca</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" className="gap-2 bg-transparent">
                    <FileText className="w-4 h-4" />
                    Propor Ajuste de Meta
                  </Button>
                  <Button variant="outline" className="gap-2 bg-transparent">
                    <Send className="w-4 h-4" />
                    Enviar para Governanca
                  </Button>
                  <Button variant="outline" className="gap-2 bg-transparent">
                    <AlertTriangle className="w-4 h-4" />
                    Registrar Justificativa
                  </Button>
                </div>
                <div className="mt-4 p-3 bg-muted/30 rounded-lg border border-border/50">
                  <p className="text-xs text-muted-foreground flex items-center gap-2">
                    <AlertTriangle className="w-3 h-3 text-destructive" />
                    Metas nao cumpridas devem ser justificadas ate o encerramento do periodo.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Painel Lateral - Ajuste de Meta */}
            <Sheet open={painelAberto} onOpenChange={setPainelAberto}>
              <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    Ajustar Meta
                  </SheetTitle>
                </SheetHeader>

                {servicoSelecionado && (
                  <div className="mt-6 space-y-6">
                    <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
                      <h4 className="font-semibold text-foreground mb-3">{servicoSelecionado.servico}</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Meta Atual</span>
                          <p className="font-medium text-foreground">{formatCurrency(servicoSelecionado.metaRS)}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Realizado</span>
                          <p className="font-medium text-foreground">{formatCurrency(servicoSelecionado.realizadoRS)}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Desvio</span>
                          <p
                            className={`font-medium ${servicoSelecionado.desvioRS > 0 ? "text-destructive" : "text-primary"}`}
                          >
                            {formatPercent(servicoSelecionado.desvioPercent)}
                          </p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Status</span>
                          <Badge
                            variant="outline"
                            className={
                              servicoSelecionado.status === "ok"
                                ? "border-primary/30 text-primary"
                                : servicoSelecionado.status === "atencao"
                                  ? "border-accent-foreground/30 text-accent-foreground"
                                  : "border-destructive/30 text-destructive"
                            }
                          >
                            {servicoSelecionado.status === "ok"
                              ? "OK"
                              : servicoSelecionado.status === "atencao"
                                ? "Atencao"
                                : "Critico"}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-foreground">Nova Meta (R$)</label>
                        <input
                          type="text"
                          className="w-full mt-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                          defaultValue={servicoSelecionado.metaRS.toLocaleString("pt-BR")}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground">Justificativa</label>
                        <textarea
                          className="w-full mt-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground min-h-[100px]"
                          placeholder="Descreva o motivo do ajuste de meta..."
                        />
                      </div>
                    </div>

                    <div className="p-3 bg-muted/30 rounded-lg border border-border/50">
                      <p className="text-xs text-muted-foreground flex items-center gap-2">
                        <AlertTriangle className="w-3 h-3" />
                        Ajustes acima de 10% requerem aprovacao do Gerente de Contrato.
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <Button className="flex-1 gap-2">
                        <Send className="w-4 h-4" />
                        Enviar Proposta
                      </Button>
                      <Button variant="outline" onClick={() => setPainelAberto(false)}>
                        Cancelar
                      </Button>
                    </div>
                  </div>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </main>
    </div>
  )
}
