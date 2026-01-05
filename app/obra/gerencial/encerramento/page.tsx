"use client"

import { AppLayout } from "@/components/layout/app-layout"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import {
  CheckCircle,
  Clock,
  FileText,
  Lock,
  Download,
  Printer,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
} from "lucide-react"
import { InfoTooltip } from "@/components/ui/info-tooltip"

// ============================================================================
// DADOS - DRE MENSAL
// ============================================================================
const dreMensal = {
  competencia: "Dezembro/2025",
  contrato: "BR-101 LOTE 2",
  receita: {
    medicaoAprovada: 12450000,
    medicaoPendente: 890000,
    totalReceita: 13340000,
  },
  deducoes: {
    pis: 86710,
    cofins: 400200,
    iss: 333500,
    totalDeducoes: 820410,
  },
  receitaLiquida: 12519590,
  custos: {
    maoDeObra: 3200000,
    materiais: 4100000,
    equipamentos: 1850000,
    subcontratados: 2100000,
    totalCustoDireto: 11250000,
  },
  margemContribuicao: 1269590,
  dag: {
    administrativo: 380000,
    financeiro: 45000,
    comercial: 28000,
    totalDAG: 453000,
  },
  resultadoOperacional: 816590,
  indicadores: {
    margemBruta: 10.14,
    margemLiquida: 6.52,
    fcd: 1.113,
    custoPorcentagem: 89.86,
  },
}

// ============================================================================
// DADOS - ETAPAS ENCERRAMENTO
// ============================================================================
const etapasEncerramento = [
  { id: 1, nome: "Fechamento Producao", status: "concluido", responsavel: "Producao", prazo: "01/01/2026", obs: "OK" },
  {
    id: 2,
    nome: "Validacao Apontamentos",
    status: "concluido",
    responsavel: "Engenharia",
    prazo: "02/01/2026",
    obs: "OK",
  },
  {
    id: 3,
    nome: "Fechamento Custo",
    status: "em-andamento",
    responsavel: "Comercial",
    prazo: "03/01/2026",
    obs: "Em analise",
  },
  { id: 4, nome: "Conciliacao Estoque", status: "pendente", responsavel: "Suprimentos", prazo: "04/01/2026", obs: "-" },
  {
    id: 5,
    nome: "Medicao Subcontratados",
    status: "pendente",
    responsavel: "Comercial",
    prazo: "05/01/2026",
    obs: "-",
  },
  { id: 6, nome: "Validacao QSMS", status: "pendente", responsavel: "QSMS", prazo: "06/01/2026", obs: "-" },
  {
    id: 7,
    nome: "Fechamento Financeiro",
    status: "pendente",
    responsavel: "Financeiro",
    prazo: "07/01/2026",
    obs: "-",
  },
  { id: 8, nome: "Geracao DRE Obra", status: "pendente", responsavel: "Controladoria", prazo: "08/01/2026", obs: "-" },
]

// ============================================================================
// DADOS - COMPARATIVO MES ANTERIOR
// ============================================================================
const comparativoMesAnterior = {
  receitaVariacao: 8.5,
  custoVariacao: 12.3,
  margemVariacao: -2.1,
  efetividadeVariacao: 3.2,
}

// ============================================================================
// HELPERS
// ============================================================================
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

const formatPercent = (value: number) => {
  return `${value.toFixed(2)}%`
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================
export default function EncerramentoPage() {
  const etapasConcluidas = etapasEncerramento.filter((e) => e.status === "concluido").length
  const totalEtapas = etapasEncerramento.length
  const progressoGeral = Math.round((etapasConcluidas / totalEtapas) * 100)

  return (
    <AppLayout>
      <div className="flex flex-col h-[calc(100vh-80px)] overflow-hidden">
        {/* ================================================================ */}
        {/* CABECALHO DO DOCUMENTO */}
        {/* ================================================================ */}
        <div className="flex items-center justify-between mb-4 flex-shrink-0 pb-4 border-b border-border/50">
          <div className="flex items-center gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-[10px] font-mono bg-muted/50">
                  GC-03
                </Badge>
                <h1 className="text-xl font-bold text-foreground">FECHAMENTO GERENCIAL MENSAL</h1>
                <InfoTooltip
                  title="GC-03 - Fechamento Gerencial"
                  description="Documento executivo de fechamento mensal do contrato. Consolida DRE, indicadores e narrativa gerencial."
                />
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Competencia: <span className="font-medium text-foreground">{dreMensal.competencia}</span> | Contrato:{" "}
                <span className="font-medium text-foreground">{dreMensal.contrato}</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className={`${progressoGeral === 100 ? "bg-green-500/10 text-green-600 border-green-500/30" : "bg-yellow-500/10 text-yellow-600 border-yellow-500/30"}`}
            >
              {progressoGeral === 100 ? <CheckCircle className="w-3 h-3 mr-1" /> : <Clock className="w-3 h-3 mr-1" />}
              {etapasConcluidas}/{totalEtapas} Etapas
            </Badge>
            <Button variant="outline" size="sm">
              <Printer className="w-4 h-4 mr-1" />
              Imprimir
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-1" />
              Exportar
            </Button>
            <Button size="sm" disabled={progressoGeral < 100}>
              <Lock className="w-4 h-4 mr-1" />
              Fechar Mes
            </Button>
          </div>
        </div>

        {/* ================================================================ */}
        {/* CONTEUDO PRINCIPAL - SCROLL */}
        {/* ================================================================ */}
        <ScrollArea className="flex-1">
          <div className="space-y-6 pr-4">
            {/* ============================================================ */}
            {/* SECAO 1: DRE MENSAL */}
            {/* ============================================================ */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  1. Demonstrativo de Resultado do Exercicio (DRE)
                </h2>
                <div className="flex-1 h-px bg-border/50" />
              </div>

              <div className="border border-border/50 rounded-lg overflow-hidden bg-card">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/30">
                      <th className="text-left p-3 font-semibold text-xs uppercase tracking-wide">Descricao</th>
                      <th className="text-right p-3 font-semibold text-xs uppercase tracking-wide w-40">Valor (R$)</th>
                      <th className="text-right p-3 font-semibold text-xs uppercase tracking-wide w-24">%</th>
                      <th className="text-center p-3 font-semibold text-xs uppercase tracking-wide w-24">
                        Var. Mes Ant.
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/30">
                    {/* RECEITA BRUTA */}
                    <tr className="bg-green-500/5">
                      <td className="p-3 font-semibold text-green-700 dark:text-green-400">RECEITA BRUTA</td>
                      <td className="p-3 text-right font-mono font-semibold text-green-700 dark:text-green-400">
                        {formatCurrency(dreMensal.receita.totalReceita)}
                      </td>
                      <td className="p-3 text-right font-mono">100.00%</td>
                      <td className="p-3 text-center">
                        <span className="inline-flex items-center text-green-600 text-xs">
                          <TrendingUp className="w-3 h-3 mr-1" />+{comparativoMesAnterior.receitaVariacao}%
                        </span>
                      </td>
                    </tr>
                    <tr className="text-muted-foreground">
                      <td className="p-3 pl-6">Medicao Aprovada</td>
                      <td className="p-3 text-right font-mono">{formatCurrency(dreMensal.receita.medicaoAprovada)}</td>
                      <td className="p-3 text-right font-mono">93.33%</td>
                      <td className="p-3"></td>
                    </tr>
                    <tr className="text-muted-foreground">
                      <td className="p-3 pl-6">Medicao Pendente</td>
                      <td className="p-3 text-right font-mono">{formatCurrency(dreMensal.receita.medicaoPendente)}</td>
                      <td className="p-3 text-right font-mono">6.67%</td>
                      <td className="p-3"></td>
                    </tr>

                    {/* DEDUCOES */}
                    <tr className="bg-red-500/5">
                      <td className="p-3 font-semibold text-red-700 dark:text-red-400">(-) DEDUCOES</td>
                      <td className="p-3 text-right font-mono font-semibold text-red-700 dark:text-red-400">
                        ({formatCurrency(dreMensal.deducoes.totalDeducoes)})
                      </td>
                      <td className="p-3 text-right font-mono">6.15%</td>
                      <td className="p-3"></td>
                    </tr>
                    <tr className="text-muted-foreground text-xs">
                      <td className="p-2 pl-6">PIS (0.65%)</td>
                      <td className="p-2 text-right font-mono">{formatCurrency(dreMensal.deducoes.pis)}</td>
                      <td className="p-2"></td>
                      <td className="p-2"></td>
                    </tr>
                    <tr className="text-muted-foreground text-xs">
                      <td className="p-2 pl-6">COFINS (3.0%)</td>
                      <td className="p-2 text-right font-mono">{formatCurrency(dreMensal.deducoes.cofins)}</td>
                      <td className="p-2"></td>
                      <td className="p-2"></td>
                    </tr>
                    <tr className="text-muted-foreground text-xs">
                      <td className="p-2 pl-6">ISS (2.5%)</td>
                      <td className="p-2 text-right font-mono">{formatCurrency(dreMensal.deducoes.iss)}</td>
                      <td className="p-2"></td>
                      <td className="p-2"></td>
                    </tr>

                    {/* RECEITA LIQUIDA */}
                    <tr className="bg-muted/50 border-t-2 border-border">
                      <td className="p-3 font-bold">(=) RECEITA LIQUIDA</td>
                      <td className="p-3 text-right font-mono font-bold">{formatCurrency(dreMensal.receitaLiquida)}</td>
                      <td className="p-3 text-right font-mono font-bold">93.85%</td>
                      <td className="p-3"></td>
                    </tr>

                    {/* CUSTOS DIRETOS */}
                    <tr className="bg-orange-500/5">
                      <td className="p-3 font-semibold text-orange-700 dark:text-orange-400">(-) CUSTOS DIRETOS</td>
                      <td className="p-3 text-right font-mono font-semibold text-orange-700 dark:text-orange-400">
                        ({formatCurrency(dreMensal.custos.totalCustoDireto)})
                      </td>
                      <td className="p-3 text-right font-mono">
                        {formatPercent(dreMensal.indicadores.custoPorcentagem)}
                      </td>
                      <td className="p-3 text-center">
                        <span className="inline-flex items-center text-red-600 text-xs">
                          <TrendingUp className="w-3 h-3 mr-1" />+{comparativoMesAnterior.custoVariacao}%
                        </span>
                      </td>
                    </tr>
                    <tr className="text-muted-foreground">
                      <td className="p-3 pl-6">Mao de Obra</td>
                      <td className="p-3 text-right font-mono">{formatCurrency(dreMensal.custos.maoDeObra)}</td>
                      <td className="p-3 text-right font-mono">28.44%</td>
                      <td className="p-3"></td>
                    </tr>
                    <tr className="text-muted-foreground">
                      <td className="p-3 pl-6">Materiais</td>
                      <td className="p-3 text-right font-mono">{formatCurrency(dreMensal.custos.materiais)}</td>
                      <td className="p-3 text-right font-mono">36.44%</td>
                      <td className="p-3"></td>
                    </tr>
                    <tr className="text-muted-foreground">
                      <td className="p-3 pl-6">Equipamentos</td>
                      <td className="p-3 text-right font-mono">{formatCurrency(dreMensal.custos.equipamentos)}</td>
                      <td className="p-3 text-right font-mono">16.44%</td>
                      <td className="p-3"></td>
                    </tr>
                    <tr className="text-muted-foreground">
                      <td className="p-3 pl-6">Subcontratados</td>
                      <td className="p-3 text-right font-mono">{formatCurrency(dreMensal.custos.subcontratados)}</td>
                      <td className="p-3 text-right font-mono">18.67%</td>
                      <td className="p-3"></td>
                    </tr>

                    {/* MARGEM DE CONTRIBUICAO */}
                    <tr className="bg-blue-500/5 border-t-2 border-border">
                      <td className="p-3 font-bold text-blue-700 dark:text-blue-400">(=) MARGEM DE CONTRIBUICAO</td>
                      <td className="p-3 text-right font-mono font-bold text-blue-700 dark:text-blue-400">
                        {formatCurrency(dreMensal.margemContribuicao)}
                      </td>
                      <td className="p-3 text-right font-mono font-bold">
                        {formatPercent(dreMensal.indicadores.margemBruta)}
                      </td>
                      <td className="p-3 text-center">
                        <span className="inline-flex items-center text-red-600 text-xs">
                          <TrendingDown className="w-3 h-3 mr-1" />
                          {comparativoMesAnterior.margemVariacao}%
                        </span>
                      </td>
                    </tr>

                    {/* DAG */}
                    <tr className="bg-purple-500/5">
                      <td className="p-3 font-semibold text-purple-700 dark:text-purple-400">
                        (-) DESPESAS ADM/GERAIS (DAG)
                      </td>
                      <td className="p-3 text-right font-mono font-semibold text-purple-700 dark:text-purple-400">
                        ({formatCurrency(dreMensal.dag.totalDAG)})
                      </td>
                      <td className="p-3 text-right font-mono">3.62%</td>
                      <td className="p-3"></td>
                    </tr>
                    <tr className="text-muted-foreground text-xs">
                      <td className="p-2 pl-6">Administrativo</td>
                      <td className="p-2 text-right font-mono">{formatCurrency(dreMensal.dag.administrativo)}</td>
                      <td className="p-2"></td>
                      <td className="p-2"></td>
                    </tr>
                    <tr className="text-muted-foreground text-xs">
                      <td className="p-2 pl-6">Financeiro</td>
                      <td className="p-2 text-right font-mono">{formatCurrency(dreMensal.dag.financeiro)}</td>
                      <td className="p-2"></td>
                      <td className="p-2"></td>
                    </tr>
                    <tr className="text-muted-foreground text-xs">
                      <td className="p-2 pl-6">Comercial</td>
                      <td className="p-2 text-right font-mono">{formatCurrency(dreMensal.dag.comercial)}</td>
                      <td className="p-2"></td>
                      <td className="p-2"></td>
                    </tr>

                    {/* RESULTADO OPERACIONAL */}
                    <tr className="bg-primary/10 border-t-2 border-primary/30">
                      <td className="p-4 font-bold text-lg">(=) RESULTADO OPERACIONAL</td>
                      <td className="p-4 text-right font-mono font-bold text-lg text-primary">
                        {formatCurrency(dreMensal.resultadoOperacional)}
                      </td>
                      <td className="p-4 text-right font-mono font-bold text-lg">
                        {formatPercent(dreMensal.indicadores.margemLiquida)}
                      </td>
                      <td className="p-4"></td>
                    </tr>
                  </tbody>
                </table>

                {/* Indicadores Resumo */}
                <div className="grid grid-cols-4 gap-4 p-4 bg-muted/30 border-t border-border/50">
                  <div className="text-center">
                    <p className="text-[10px] uppercase tracking-wide text-muted-foreground mb-1">Margem Bruta</p>
                    <p className="text-lg font-bold font-mono">{formatPercent(dreMensal.indicadores.margemBruta)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] uppercase tracking-wide text-muted-foreground mb-1">Margem Liquida</p>
                    <p className="text-lg font-bold font-mono">{formatPercent(dreMensal.indicadores.margemLiquida)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] uppercase tracking-wide text-muted-foreground mb-1">F/CD</p>
                    <p className="text-lg font-bold font-mono">{dreMensal.indicadores.fcd.toFixed(3)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] uppercase tracking-wide text-muted-foreground mb-1">Custo s/ Receita</p>
                    <p className="text-lg font-bold font-mono">
                      {formatPercent(dreMensal.indicadores.custoPorcentagem)}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* ============================================================ */}
            {/* SECAO 2: NARRATIVA GERENCIAL */}
            {/* ============================================================ */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  2. Narrativa Gerencial do Mes
                </h2>
                <div className="flex-1 h-px bg-border/50" />
              </div>

              <div className="border border-border/50 rounded-lg overflow-hidden bg-card">
                {/* Resumo Executivo */}
                <div className="p-4 border-b border-border/30">
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                    2.1 Resumo Executivo
                  </h3>
                  <Textarea
                    className="min-h-[80px] bg-muted/20 border-border/30 text-sm"
                    placeholder="Descreva o resumo executivo do mes..."
                    defaultValue="O mes de Dezembro/2025 apresentou resultado operacional positivo de R$ 816.590, representando margem liquida de 6,52%. Houve aumento de 8,5% na receita em relacao ao mes anterior, porem os custos cresceram 12,3%, impactando negativamente a margem em 2,1 pontos percentuais."
                  />
                </div>

                {/* Principais Realizacoes */}
                <div className="p-4 border-b border-border/30">
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                    2.2 Principais Realizacoes
                  </h3>
                  <Textarea
                    className="min-h-[80px] bg-muted/20 border-border/30 text-sm"
                    placeholder="Liste as principais realizacoes do mes..."
                    defaultValue="• Conclusao da concretagem do bloco B3 (100%)
• Aprovacao da medicao #23 no valor de R$ 12,45 MM
• Mobilizacao de 45 novos colaboradores para frente de servico
• Recebimento de equipamentos de terraplenagem (3 escavadeiras)"
                  />
                </div>

                {/* Pontos de Atencao */}
                <div className="p-4 border-b border-border/30">
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-500" />
                    2.3 Pontos de Atencao
                  </h3>
                  <Textarea
                    className="min-h-[80px] bg-yellow-500/5 border-yellow-500/30 text-sm"
                    placeholder="Descreva os pontos de atencao..."
                    defaultValue="• Aumento de 12,3% nos custos diretos - necessario plano de acao
• Atraso de 5 dias no cronograma de fundacoes
• 2 NCs abertas aguardando tratativa (prazo: 15/01)
• Pendencia de licenciamento ambiental para area de bota-fora"
                  />
                </div>

                {/* Projecao Proximo Mes */}
                <div className="p-4">
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                    2.4 Projecao Proximo Mes
                  </h3>
                  <Textarea
                    className="min-h-[80px] bg-muted/20 border-border/30 text-sm"
                    placeholder="Descreva a projecao para o proximo mes..."
                    defaultValue="• Meta de medicao: R$ 14,2 MM
• Previsto inicio das obras de drenagem (frente 3)
• Planejada desmobilizacao de 20% do efetivo de terraplenagem
• Expectativa de reducao de 5% nos custos com otimizacao de frota"
                  />
                </div>
              </div>
            </section>

            {/* ============================================================ */}
            {/* SECAO 3: STATUS DO FECHAMENTO */}
            {/* ============================================================ */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  3. Status do Fechamento
                </h2>
                <div className="flex-1 h-px bg-border/50" />
              </div>

              <div className="border border-border/50 rounded-lg overflow-hidden bg-card">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/30">
                      <th className="text-left p-3 font-semibold text-xs uppercase tracking-wide w-12">#</th>
                      <th className="text-left p-3 font-semibold text-xs uppercase tracking-wide">Etapa</th>
                      <th className="text-left p-3 font-semibold text-xs uppercase tracking-wide w-32">Responsavel</th>
                      <th className="text-left p-3 font-semibold text-xs uppercase tracking-wide w-28">Prazo</th>
                      <th className="text-center p-3 font-semibold text-xs uppercase tracking-wide w-28">Status</th>
                      <th className="text-left p-3 font-semibold text-xs uppercase tracking-wide w-32">Obs</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/30">
                    {etapasEncerramento.map((etapa) => (
                      <tr
                        key={etapa.id}
                        className={`${
                          etapa.status === "concluido"
                            ? "bg-green-500/5"
                            : etapa.status === "em-andamento"
                              ? "bg-yellow-500/5"
                              : ""
                        }`}
                      >
                        <td className="p-3 font-mono text-muted-foreground">{etapa.id}</td>
                        <td className="p-3 font-medium">{etapa.nome}</td>
                        <td className="p-3 text-muted-foreground">{etapa.responsavel}</td>
                        <td className="p-3 font-mono text-muted-foreground">{etapa.prazo}</td>
                        <td className="p-3 text-center">
                          {etapa.status === "concluido" ? (
                            <Badge className="bg-green-500/20 text-green-600 border-green-500/30">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Concluido
                            </Badge>
                          ) : etapa.status === "em-andamento" ? (
                            <Badge className="bg-yellow-500/20 text-yellow-600 border-yellow-500/30">
                              <Clock className="w-3 h-3 mr-1" />
                              Em Andamento
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-muted-foreground">
                              Pendente
                            </Badge>
                          )}
                        </td>
                        <td className="p-3 text-xs text-muted-foreground">{etapa.obs}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Rodape com progresso */}
                <div className="p-4 bg-muted/30 border-t border-border/50 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">Progresso Geral:</span>
                    <div className="w-48 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-500"
                        style={{ width: `${progressoGeral}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold">{progressoGeral}%</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      {etapasConcluidas} Concluidas
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-yellow-500" />
                      {etapasEncerramento.filter((e) => e.status === "em-andamento").length} Em Andamento
                    </span>
                    <span className="flex items-center gap-1">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      {etapasEncerramento.filter((e) => e.status === "pendente").length} Pendentes
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* ============================================================ */}
            {/* RODAPE DO DOCUMENTO */}
            {/* ============================================================ */}
            <footer className="border-t border-border/50 pt-4 pb-8">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div>
                  <p>Documento gerado em: 05/01/2026 as 20:00</p>
                  <p>Responsavel: Gerente de Contrato</p>
                </div>
                <div className="text-right">
                  <p>ERP GENESIS v4.5.6</p>
                  <p>GC-03 - Fechamento Gerencial Mensal</p>
                </div>
              </div>
            </footer>
          </div>
        </ScrollArea>
      </div>
    </AppLayout>
  )
}
