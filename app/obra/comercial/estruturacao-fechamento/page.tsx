"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import { ObraComercialNavbar } from "../../_components/obra-comercial-navbar"
import {
  FileText,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Shield,
  FileSignature,
  Ruler,
  Calculator,
  Package,
  Printer,
  Download,
  BarChart3,
} from "lucide-react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"

// Dados mockados - Comparativo Orcamento vs Meta
const comparativoGeral = {
  // Receita
  receitaContratual: 405000000,
  receitaMeta: 405000000,

  // Custo Direto
  custoOrcado: 285000000,
  custoMeta: 258780000,
  diferencaCusto: 26220000,
  percentualEconomia: 9.2,

  // Custo Indireto
  indiretoOrcado: 42750000,
  indiretoMeta: 40112500,
  diferencaIndireto: 2637500,

  // BDI
  bdiOrcado: 77250000,
  bdiMeta: 77250000,

  // Resultado
  margemOrcada: 77250000,
  margemMeta: 106107500,
  diferencaMargem: 28857500,
  percentualMargemOrcada: 19.07,
  percentualMargemMeta: 26.2,
}

// Dados mockados - Status das Estruturacoes
const statusEstruturacoes = [
  { id: "contrato", nome: "Contrato", status: "homologado", responsavel: "Maria Silva", data: "02/01/2026" },
  { id: "medicao", nome: "Medicao", status: "homologado", responsavel: "Carlos Souza", data: "03/01/2026" },
  { id: "custo", nome: "Custo (EAP)", status: "revisado", responsavel: "Ana Costa", data: "04/01/2026" },
  { id: "suprimentos", nome: "Suprimentos", status: "em_estruturacao", responsavel: "Pedro Lima", data: "05/01/2026" },
  { id: "indireto", nome: "Indireto", status: "nao_iniciado", responsavel: "-", data: "-" },
]

// Dados mockados - Comparativo por Categoria
const comparativoCategoria = [
  { categoria: "Material", orcado: 128250000, meta: 115425000, diferenca: 12825000, percentual: 10.0 },
  { categoria: "Mao de Obra", orcado: 71250000, meta: 67687500, diferenca: 3562500, percentual: 5.0 },
  { categoria: "Equipamento", orcado: 42750000, meta: 36337500, diferenca: 6412500, percentual: 15.0 },
  { categoria: "Terceiro", orcado: 42750000, meta: 39330000, diferenca: 3420000, percentual: 8.0 },
]

// Validacoes para fechamento
const validacoesFechamento = [
  { item: "Contrato estruturado e homologado", status: true },
  { item: "Medicao estruturada e homologada", status: true },
  { item: "EAP de Custo revisada", status: true },
  { item: "Suprimentos estruturado", status: false },
  { item: "Indireto estruturado", status: false },
  { item: "Metas CR/CD definidas", status: true },
  { item: "Calendario de medicao configurado", status: true },
]

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value)
}

export default function EstruturacaoFechamentoPage() {
  const router = useRouter()
  const pathname = usePathname()

  const navegacaoSetor = [
    { codigo: "EST-00", nome: "Visao Geral", rota: "/obra/comercial/estruturacao-geral", icon: FileText },
    { codigo: "EST-01", nome: "Contrato", rota: "/obra/comercial/estruturacao-contrato", icon: FileSignature },
    { codigo: "EST-02", nome: "Medicao", rota: "/obra/comercial/estruturacao-medicao", icon: Ruler },
    { codigo: "EST-03", nome: "Custo", rota: "/obra/comercial/estruturacao-custo", icon: Calculator },
    { codigo: "EST-04", nome: "Suprimentos", rota: "/obra/comercial/estruturacao-suprimentos", icon: Package },
    { codigo: "EST-F", nome: "Fechamento", rota: "/obra/comercial/estruturacao-fechamento", icon: BarChart3 },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "homologado":
        return (
          <Badge className="bg-primary/10 text-primary text-[10px]">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Homologado
          </Badge>
        )
      case "revisado":
        return (
          <Badge className="bg-blue-500/10 text-blue-600 text-[10px]">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Revisado
          </Badge>
        )
      case "em_estruturacao":
        return (
          <Badge className="bg-amber-500/10 text-amber-600 text-[10px]">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Em Estruturacao
          </Badge>
        )
      case "nao_iniciado":
        return (
          <Badge variant="outline" className="text-[10px]">
            <XCircle className="h-3 w-3 mr-1" />
            Nao Iniciado
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="text-[10px]">
            {status}
          </Badge>
        )
    }
  }

  const prontoParaFechamento = validacoesFechamento.every((v) => v.status)
  const validacoesOk = validacoesFechamento.filter((v) => v.status).length
  const validacoesTotal = validacoesFechamento.length

  return (
    <div className="flex flex-col h-full overflow-auto">
      {/* Header */}
      <div className="flex-none border-b border-border bg-card/30 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/obra/comercial/estruturacao-geral">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-semibold text-foreground">Fechamento da Estruturacao</h1>
                <Badge variant="outline" className="text-[10px] font-mono">
                  EST-F
                </Badge>
                {prontoParaFechamento ? (
                  <Badge className="bg-primary/10 text-primary text-[10px]">Pronto para Fechar</Badge>
                ) : (
                  <Badge className="bg-amber-500/10 text-amber-600 text-[10px]">Pendencias</Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">Consolidacao: Orcamento vs Meta</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Printer className="h-4 w-4" />
              Imprimir
            </Button>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Download className="h-4 w-4" />
              Exportar
            </Button>
            <Button size="sm" className="gap-2" disabled={!prontoParaFechamento}>
              <Shield className="h-4 w-4" />
              Fechar Estruturacao
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1">
        <div className="p-6 space-y-6">
          {/* Navegacao */}
          <div className="flex items-center gap-2 pb-2 border-b border-border">
            {navegacaoSetor.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.rota
              return (
                <Button
                  key={item.codigo}
                  variant="outline"
                  size="sm"
                  className={`h-8 gap-1.5 text-xs ${isActive ? "bg-muted/50 border-primary/30" : "bg-transparent"}`}
                  onClick={() => router.push(item.rota)}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {item.nome}
                </Button>
              )
            })}
          </div>

          {/* Painel Gerencial - Comparativo Geral */}
          <div className="border border-border rounded-lg overflow-hidden">
            <div className="bg-muted/30 px-4 py-3 border-b border-border">
              <h2 className="text-sm font-semibold uppercase tracking-wide">Resultado Economico da Estruturacao</h2>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-3 gap-6">
                {/* Coluna 1 - Orcamento */}
                <div className="space-y-4">
                  <div className="text-center pb-2 border-b border-border">
                    <h3 className="text-xs font-semibold uppercase text-muted-foreground">Orcamento Original</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Receita</span>
                      <span className="font-mono font-medium">
                        {formatCurrency(comparativoGeral.receitaContratual)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">(-) Custo Direto</span>
                      <span className="font-mono">{formatCurrency(comparativoGeral.custoOrcado)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">(-) Custo Indireto</span>
                      <span className="font-mono">{formatCurrency(comparativoGeral.indiretoOrcado)}</span>
                    </div>
                    <div className="border-t border-border pt-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold">Margem Bruta</span>
                        <div className="text-right">
                          <span className="font-mono font-bold">{formatCurrency(comparativoGeral.margemOrcada)}</span>
                          <p className="text-xs text-muted-foreground">{comparativoGeral.percentualMargemOrcada}%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Coluna 2 - Meta */}
                <div className="space-y-4">
                  <div className="text-center pb-2 border-b border-primary/30">
                    <h3 className="text-xs font-semibold uppercase text-primary">Meta Definida</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Receita</span>
                      <span className="font-mono font-medium">{formatCurrency(comparativoGeral.receitaMeta)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">(-) Custo Direto</span>
                      <span className="font-mono text-primary">{formatCurrency(comparativoGeral.custoMeta)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">(-) Custo Indireto</span>
                      <span className="font-mono text-primary">{formatCurrency(comparativoGeral.indiretoMeta)}</span>
                    </div>
                    <div className="border-t border-border pt-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold">Margem Bruta</span>
                        <div className="text-right">
                          <span className="font-mono font-bold text-primary">
                            {formatCurrency(comparativoGeral.margemMeta)}
                          </span>
                          <p className="text-xs text-primary">{comparativoGeral.percentualMargemMeta}%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Coluna 3 - Diferenca */}
                <div className="space-y-4">
                  <div className="text-center pb-2 border-b border-emerald-500/30">
                    <h3 className="text-xs font-semibold uppercase text-emerald-600">Ganho Previsto</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Receita</span>
                      <span className="font-mono text-muted-foreground">-</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Economia CD</span>
                      <span className="font-mono text-emerald-600">
                        +{formatCurrency(comparativoGeral.diferencaCusto)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Economia CI</span>
                      <span className="font-mono text-emerald-600">
                        +{formatCurrency(comparativoGeral.diferencaIndireto)}
                      </span>
                    </div>
                    <div className="border-t border-border pt-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold">Ganho Total</span>
                        <div className="text-right">
                          <span className="font-mono font-bold text-emerald-600">
                            +{formatCurrency(comparativoGeral.diferencaMargem)}
                          </span>
                          <p className="text-xs text-emerald-600">
                            +
                            {(comparativoGeral.percentualMargemMeta - comparativoGeral.percentualMargemOrcada).toFixed(
                              1,
                            )}
                            pp
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Grid Principal */}
          <div className="grid grid-cols-12 gap-6">
            {/* Comparativo por Categoria */}
            <div className="col-span-7">
              <div className="flex items-center gap-2 mb-3">
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
                <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                  Economia por Categoria
                </h2>
              </div>
              <div className="border border-border rounded-lg overflow-hidden">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-muted/50 border-b border-border">
                      <th className="text-left py-2.5 px-3 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">
                        Categoria
                      </th>
                      <th className="text-right py-2.5 px-3 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">
                        Orcado
                      </th>
                      <th className="text-right py-2.5 px-3 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">
                        Meta
                      </th>
                      <th className="text-right py-2.5 px-3 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">
                        Economia
                      </th>
                      <th className="text-right py-2.5 px-3 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">
                        %
                      </th>
                      <th className="py-2.5 px-3 w-24"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparativoCategoria.map((cat, index) => (
                      <tr
                        key={cat.categoria}
                        className={`border-b border-border/50 hover:bg-muted/30 ${index % 2 === 0 ? "bg-background" : "bg-muted/20"}`}
                      >
                        <td className="py-2.5 px-3 font-medium">{cat.categoria}</td>
                        <td className="py-2.5 px-3 text-right font-mono tabular-nums">{formatCurrency(cat.orcado)}</td>
                        <td className="py-2.5 px-3 text-right font-mono tabular-nums text-primary">
                          {formatCurrency(cat.meta)}
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono tabular-nums text-emerald-600">
                          +{formatCurrency(cat.diferenca)}
                        </td>
                        <td className="py-2.5 px-3 text-right">
                          <Badge className="bg-emerald-500/10 text-emerald-600 text-[10px]">-{cat.percentual}%</Badge>
                        </td>
                        <td className="py-2.5 px-3">
                          <Progress value={100 - cat.percentual} className="h-1.5" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-muted/50 border-t border-border">
                      <td className="py-2.5 px-3 font-semibold">Total</td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-nums font-semibold">
                        {formatCurrency(comparativoGeral.custoOrcado)}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-nums font-semibold text-primary">
                        {formatCurrency(comparativoGeral.custoMeta)}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-nums font-semibold text-emerald-600">
                        +{formatCurrency(comparativoGeral.diferencaCusto)}
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <Badge className="bg-emerald-500/10 text-emerald-600 text-[10px]">
                          -{comparativoGeral.percentualEconomia}%
                        </Badge>
                      </td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Status e Validacoes */}
            <div className="col-span-5 space-y-4">
              {/* Status das Estruturacoes */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                  <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                    Status das Estruturacoes
                  </h2>
                </div>
                <div className="border border-border rounded-lg overflow-hidden">
                  <table className="w-full text-xs">
                    <tbody>
                      {statusEstruturacoes.map((est, index) => (
                        <tr
                          key={est.id}
                          className={`border-b border-border/50 ${index % 2 === 0 ? "bg-background" : "bg-muted/20"}`}
                        >
                          <td className="py-2 px-3 font-medium">{est.nome}</td>
                          <td className="py-2 px-3">{getStatusBadge(est.status)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Validacoes */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">Validacoes</h2>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {validacoesOk}/{validacoesTotal}
                  </span>
                </div>
                <div className="border border-border rounded-lg overflow-hidden">
                  <table className="w-full text-xs">
                    <tbody>
                      {validacoesFechamento.map((val, index) => (
                        <tr
                          key={val.item}
                          className={`border-b border-border/50 ${index % 2 === 0 ? "bg-background" : "bg-muted/20"}`}
                        >
                          <td className="py-2 px-3 w-6">
                            {val.status ? (
                              <CheckCircle2 className="h-4 w-4 text-primary" />
                            ) : (
                              <XCircle className="h-4 w-4 text-destructive" />
                            )}
                          </td>
                          <td className="py-2 px-3 text-muted-foreground">{val.item}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Indicador */}
                <div
                  className={`mt-3 p-3 rounded-lg border ${prontoParaFechamento ? "bg-primary/10 border-primary/20" : "bg-amber-500/10 border-amber-500/20"}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium">Pronto para fechamento?</span>
                    <Badge className={`text-[10px] ${prontoParaFechamento ? "bg-primary" : "bg-amber-500"}`}>
                      {prontoParaFechamento ? "SIM" : "NAO"}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
