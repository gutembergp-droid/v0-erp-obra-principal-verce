"use client"

import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { InfoTooltip } from "@/components/ui/info-tooltip"
import { FileText, DollarSign, ArrowRight, Banknote, Receipt, ClipboardCheck, Scale, AlertTriangle } from "lucide-react"
import Link from "next/link"

// Dados mockados
const resumoExecutivo = {
  avancoFisico: { valor: 67.8, meta: 70, status: "atencao" },
  avancoFinanceiro: { valor: 62.3, meta: 65, status: "atencao" },
  receitaMedidaAcumulada: 27450000,
  receitaFaturada: 25200000,
  receitaRecebida: 22800000,
  aReceber: 4650000,
}

const medicaoProducao = {
  servicosPrevistos: 1247,
  servicosExecutados: 846,
  servicosRemunerados: 789,
  diferencaExecRem: 57,
  impactoDesempenho: -2.3,
}

const medicaoCliente = {
  medicaoAprovada: 25200000,
  medicaoFaturada: 25200000,
  medicaoPaga: 22800000,
  medicaoDisputa: 1850000,
  impactosMudancas: {
    sme: 3,
    aditivos: 2,
    pleitos: 1,
  },
}

const alertasGovernanca = [
  {
    tipo: "critico",
    titulo: "Servico executado nao remunerado",
    descricao: "57 servicos aguardando aprovacao do cliente",
    valor: "R$ 2.280.000",
  },
  {
    tipo: "atencao",
    titulo: "Medicao pendente de aprovacao",
    descricao: "Medicao #12 aguardando cliente ha 8 dias",
    valor: "R$ 1.450.000",
  },
  {
    tipo: "atencao",
    titulo: "Faturamento atrasado",
    descricao: "NF referente a medicao #11 nao emitida",
    valor: "R$ 2.100.000",
  },
  {
    tipo: "info",
    titulo: "Impacto economico relevante",
    descricao: "Variacao de escopo pode impactar margem",
    valor: "-1.2%",
  },
]

function formatCurrency(value: number): string {
  if (value >= 1000000) {
    return `R$ ${(value / 1000000).toFixed(1)} Mi`
  }
  if (value >= 1000) {
    return `R$ ${(value / 1000).toFixed(0)} mil`
  }
  return `R$ ${value.toFixed(0)}`
}

function formatNumber(value: number): string {
  return value.toLocaleString("pt-BR")
}

function ReceitaMedicaoContent() {
  return (
    <div className="overflow-auto h-full">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex-shrink-0 border-b border-border bg-card/50 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-semibold tracking-tight">Receita & Medicao</h1>
                  <Badge variant="outline" className="text-[10px] font-mono">
                    RM-01
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">Execucao fisica e governanca contratual</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="bg-transparent">
                <FileText className="h-4 w-4 mr-1" />
                Exportar
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <ScrollArea className="flex-1">
          <div className="p-6 space-y-6">
            {/* BLOCO 1 - Resumo Executivo */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Resumo Executivo
                </h2>
                <InfoTooltip content="Visao consolidada dos principais indicadores de receita e medicao" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {/* Avanco Fisico */}
                <Link href="/obra/comercial/medicao-producao" className="group">
                  <div className="bg-card border border-border rounded-lg p-4 hover:border-primary/40 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Avanco Fisico</span>
                      <div
                        className={`w-2 h-2 rounded-full ${
                          resumoExecutivo.avancoFisico.status === "atencao" ? "bg-accent-foreground" : "bg-primary"
                        }`}
                      />
                    </div>
                    <div className="text-2xl font-bold tabular-nums text-foreground">
                      {resumoExecutivo.avancoFisico.valor}%
                    </div>
                    <div className="text-[10px] text-muted-foreground mt-1">
                      Meta: {resumoExecutivo.avancoFisico.meta}%
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5 mt-2">
                      <div
                        className="bg-primary/60 h-1.5 rounded-full"
                        style={{
                          width: `${(resumoExecutivo.avancoFisico.valor / resumoExecutivo.avancoFisico.meta) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </Link>

                {/* Avanco Financeiro */}
                <Link href="/obra/comercial/medicao-cliente" className="group">
                  <div className="bg-card border border-border rounded-lg p-4 hover:border-primary/40 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        Avanco Financeiro
                      </span>
                      <div
                        className={`w-2 h-2 rounded-full ${
                          resumoExecutivo.avancoFinanceiro.status === "atencao" ? "bg-accent-foreground" : "bg-primary"
                        }`}
                      />
                    </div>
                    <div className="text-2xl font-bold tabular-nums text-foreground">
                      {resumoExecutivo.avancoFinanceiro.valor}%
                    </div>
                    <div className="text-[10px] text-muted-foreground mt-1">
                      Meta: {resumoExecutivo.avancoFinanceiro.meta}%
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5 mt-2">
                      <div
                        className="bg-primary/60 h-1.5 rounded-full"
                        style={{
                          width: `${(resumoExecutivo.avancoFinanceiro.valor / resumoExecutivo.avancoFinanceiro.meta) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </Link>

                {/* Receita Medida */}
                <Link href="/obra/comercial/medicao-cliente" className="group">
                  <div className="bg-card border border-border rounded-lg p-4 hover:border-primary/40 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Receita Medida</span>
                      <Receipt className="h-3.5 w-3.5 text-muted-foreground" />
                    </div>
                    <div className="text-2xl font-bold tabular-nums text-foreground">
                      {formatCurrency(resumoExecutivo.receitaMedidaAcumulada)}
                    </div>
                    <div className="text-[10px] text-muted-foreground mt-1">Acumulado</div>
                  </div>
                </Link>

                {/* Receita Faturada */}
                <Link href="/obra/comercial/faturamento" className="group">
                  <div className="bg-card border border-border rounded-lg p-4 hover:border-primary/40 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        Receita Faturada
                      </span>
                      <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                    </div>
                    <div className="text-2xl font-bold tabular-nums text-foreground">
                      {formatCurrency(resumoExecutivo.receitaFaturada)}
                    </div>
                    <div className="text-[10px] text-muted-foreground mt-1">100% da medida</div>
                  </div>
                </Link>

                {/* Receita Recebida */}
                <Link href="/obra/comercial/faturamento" className="group">
                  <div className="bg-card border border-border rounded-lg p-4 hover:border-primary/40 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        Receita Recebida
                      </span>
                      <Banknote className="h-3.5 w-3.5 text-muted-foreground" />
                    </div>
                    <div className="text-2xl font-bold tabular-nums text-foreground">
                      {formatCurrency(resumoExecutivo.receitaRecebida)}
                    </div>
                    <div className="text-[10px] text-muted-foreground mt-1">90.5% do faturado</div>
                  </div>
                </Link>

                {/* A Receber */}
                <Link href="/obra/comercial/faturamento" className="group">
                  <div className="bg-card border border-border rounded-lg p-4 hover:border-primary/40 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">A Receber</span>
                      <DollarSign className="h-3.5 w-3.5 text-muted-foreground" />
                    </div>
                    <div className="text-2xl font-bold tabular-nums text-foreground">
                      {formatCurrency(resumoExecutivo.aReceber)}
                    </div>
                    <div className="text-[10px] text-muted-foreground mt-1">Saldo pendente</div>
                  </div>
                </Link>
              </div>
            </section>

            {/* BLOCO 2 e 3 - Medicoes lado a lado */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* BLOCO 2 - Medicao de Producao */}
              <section className="bg-card border border-border rounded-lg">
                <div className="p-4 border-b border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
                      <h2 className="text-sm font-semibold">Medicao de Producao</h2>
                    </div>
                    <Badge variant="outline" className="text-[9px]">
                      EXECUCAO FISICA
                    </Badge>
                  </div>
                </div>

                <div className="p-4">
                  <table className="w-full text-sm">
                    <tbody className="divide-y divide-border">
                      <tr className="hover:bg-muted/30">
                        <td className="py-2.5 text-muted-foreground">Servicos Previstos (EAP)</td>
                        <td className="py-2.5 text-right font-medium tabular-nums">
                          {formatNumber(medicaoProducao.servicosPrevistos)}
                        </td>
                      </tr>
                      <tr className="hover:bg-muted/30">
                        <td className="py-2.5 text-muted-foreground">Servicos Executados</td>
                        <td className="py-2.5 text-right font-medium tabular-nums">
                          {formatNumber(medicaoProducao.servicosExecutados)}
                        </td>
                      </tr>
                      <tr className="hover:bg-muted/30">
                        <td className="py-2.5 text-muted-foreground">Servicos Remunerados</td>
                        <td className="py-2.5 text-right font-medium tabular-nums">
                          {formatNumber(medicaoProducao.servicosRemunerados)}
                        </td>
                      </tr>
                      <tr className="hover:bg-muted/30 bg-muted/30">
                        <td className="py-2.5 text-muted-foreground flex items-center gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent-foreground" />
                          Diferenca (Exec - Rem)
                        </td>
                        <td className="py-2.5 text-right font-bold tabular-nums">
                          {formatNumber(medicaoProducao.diferencaExecRem)}
                        </td>
                      </tr>
                      <tr className="hover:bg-muted/30">
                        <td className="py-2.5 text-muted-foreground">Impacto no Desempenho</td>
                        <td className="py-2.5 text-right font-medium tabular-nums text-muted-foreground">
                          {medicaoProducao.impactoDesempenho}%
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="mt-4 p-3 bg-muted/30 rounded-md border border-border">
                    <p className="text-[11px] text-muted-foreground italic">
                      "A medicao de producao reflete a verdade fisica da obra, independente da remuneracao do cliente."
                    </p>
                  </div>

                  <div className="mt-4">
                    <Link href="/obra/comercial/medicao-producao">
                      <Button className="w-full bg-transparent" variant="outline">
                        Acessar Medicao de Producao
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </section>

              {/* BLOCO 3 - Medicao do Cliente */}
              <section className="bg-card border border-border rounded-lg">
                <div className="p-4 border-b border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Scale className="h-4 w-4 text-muted-foreground" />
                      <h2 className="text-sm font-semibold">Medicao do Cliente</h2>
                    </div>
                    <Badge variant="outline" className="text-[9px]">
                      GOVERNANCA CONTRATUAL
                    </Badge>
                  </div>
                </div>

                <div className="p-4">
                  <table className="w-full text-sm">
                    <tbody className="divide-y divide-border">
                      <tr className="hover:bg-muted/30">
                        <td className="py-2.5 text-muted-foreground">Medicao Aprovada</td>
                        <td className="py-2.5 text-right font-medium tabular-nums">
                          {formatCurrency(medicaoCliente.medicaoAprovada)}
                        </td>
                      </tr>
                      <tr className="hover:bg-muted/30">
                        <td className="py-2.5 text-muted-foreground">Medicao Faturada</td>
                        <td className="py-2.5 text-right font-medium tabular-nums">
                          {formatCurrency(medicaoCliente.medicaoFaturada)}
                        </td>
                      </tr>
                      <tr className="hover:bg-muted/30">
                        <td className="py-2.5 text-muted-foreground">Medicao Paga</td>
                        <td className="py-2.5 text-right font-medium tabular-nums">
                          {formatCurrency(medicaoCliente.medicaoPaga)}
                        </td>
                      </tr>
                      <tr className="hover:bg-muted/30 bg-muted/30">
                        <td className="py-2.5 text-muted-foreground flex items-center gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent-foreground" />
                          Em Disputa / Ajuste
                        </td>
                        <td className="py-2.5 text-right font-bold tabular-nums">
                          {formatCurrency(medicaoCliente.medicaoDisputa)}
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="mt-4 flex gap-2">
                    <div className="flex-1 p-2 bg-muted/30 rounded border border-border text-center">
                      <div className="text-lg font-bold tabular-nums">{medicaoCliente.impactosMudancas.sme}</div>
                      <div className="text-[9px] text-muted-foreground uppercase">SMEs</div>
                    </div>
                    <div className="flex-1 p-2 bg-muted/30 rounded border border-border text-center">
                      <div className="text-lg font-bold tabular-nums">{medicaoCliente.impactosMudancas.aditivos}</div>
                      <div className="text-[9px] text-muted-foreground uppercase">Aditivos</div>
                    </div>
                    <div className="flex-1 p-2 bg-muted/30 rounded border border-border text-center">
                      <div className="text-lg font-bold tabular-nums">{medicaoCliente.impactosMudancas.pleitos}</div>
                      <div className="text-[9px] text-muted-foreground uppercase">Pleitos</div>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-muted/30 rounded-md border border-border">
                    <p className="text-[11px] text-muted-foreground italic">
                      "A medicao do cliente reflete a governanca contratual e financeira."
                    </p>
                  </div>

                  <div className="mt-4">
                    <Link href="/obra/comercial/medicao-cliente">
                      <Button className="w-full bg-transparent" variant="outline">
                        Acessar Medicao do Cliente
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </section>
            </div>

            {/* BLOCO 4 - Alertas de Governanca */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Alertas de Governanca
                </h2>
                <InfoTooltip content="Pontos de atencao que requerem acao imediata ou acompanhamento" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {alertasGovernanca.map((alerta, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg border border-border bg-card cursor-pointer hover:border-primary/40 transition-colors"
                  >
                    <div className="flex items-start gap-2">
                      <div
                        className={`w-2 h-2 rounded-full mt-1 flex-shrink-0 ${
                          alerta.tipo === "critico"
                            ? "bg-destructive"
                            : alerta.tipo === "atencao"
                              ? "bg-accent-foreground"
                              : "bg-primary"
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-semibold truncate">{alerta.titulo}</h4>
                        <p className="text-[10px] text-muted-foreground mt-0.5 line-clamp-2">{alerta.descricao}</p>
                        <div className="mt-2 flex items-center justify-between">
                          <Badge variant="outline" className="text-[9px]">
                            {alerta.tipo === "critico" ? "CRITICO" : alerta.tipo === "atencao" ? "ATENCAO" : "INFO"}
                          </Badge>
                          <span className="text-xs font-bold">{alerta.valor}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Links de Navegacao */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Navegacao Rapida
                </h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Link href="/obra/comercial/change-control">
                  <Button variant="outline" className="w-full bg-transparent h-auto py-3 flex-col gap-1">
                    <AlertTriangle className="h-5 w-5" />
                    <span className="text-xs">Change Control</span>
                  </Button>
                </Link>
                <Link href="/obra/comercial/faturamento">
                  <Button variant="outline" className="w-full bg-transparent h-auto py-3 flex-col gap-1">
                    <FileText className="h-5 w-5" />
                    <span className="text-xs">Faturamento</span>
                  </Button>
                </Link>
                <Link href="/obra/comercial/medicao-producao">
                  <Button variant="outline" className="w-full bg-transparent h-auto py-3 flex-col gap-1">
                    <ClipboardCheck className="h-5 w-5" />
                    <span className="text-xs">Medicao Producao</span>
                  </Button>
                </Link>
                <Link href="/obra/comercial/medicao-cliente">
                  <Button variant="outline" className="w-full bg-transparent h-auto py-3 flex-col gap-1">
                    <Scale className="h-5 w-5" />
                    <span className="text-xs">Medicao Cliente</span>
                  </Button>
                </Link>
              </div>
            </section>
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

export default function ReceitaMedicaoPage() {
  return (
    <Suspense fallback={null}>
      <ReceitaMedicaoContent />
    </Suspense>
  )
}
