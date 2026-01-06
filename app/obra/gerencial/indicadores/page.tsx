"use client"

import { useState, Suspense } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Download, Calculator, BarChart2, Table, Info } from "lucide-react"

import {
  KPICardOficial,
  CardConsolidado,
  ComposicaoCustos,
  CicloGovernanca,
  AlertasModulo,
} from "@/components/indicadores"

// ============================================
// DADOS - KPIs OFICIAIS ERP-GNESIS
// ============================================

const kpisOficiais = [
  {
    codigo: "F/CD",
    nome: "Faturamento / Custo Direto",
    descricao: "Avaliar eficiência de geração de receita em relação ao custo produtivo",
    formula: "Faturamento / Custo Direto",
    valor: 1.19,
    meta: 1.25,
    anterior: 1.18,
    tipo: "maior_melhor",
    interpretacao: "Quanto maior, melhor. Queda indica pressão em Suprimentos, Produtividade ou Planejamento",
    acao: "Investigar item de Custo Direto responsável pelo desvio",
    historico: [1.12, 1.14, 1.15, 1.17, 1.18, 1.19],
    detalhes: {
      faturamento: 152800000,
      custoDireto: 128500000,
    },
  },
  {
    codigo: "CR/CO",
    nome: "Custo Real / Custo Orçado",
    descricao: "Medir aderência da execução ao planejamento",
    formula: "Custo Real / Custo Orçado",
    valor: 0.98,
    meta: 1.0,
    anterior: 1.02,
    tipo: "menor_melhor",
    interpretacao: "< 1.00: Ganho | = 1.00: Aderência total | > 1.00: Desvio/Estouro",
    acao: "Ativação imediata de plano de contenção e revisão operacional",
    historico: [1.05, 1.04, 1.03, 1.02, 1.01, 0.98],
    detalhes: {
      custoReal: 139700000,
      custoOrcado: 142000000,
    },
  },
  {
    codigo: "CI/CD",
    nome: "Custo Indireto / Custo Direto",
    descricao: "Avaliar eficiência da estrutura de gestão da obra",
    formula: "Custo Indireto / Custo Direto",
    valor: 0.087,
    meta: 0.08,
    anterior: 0.092,
    tipo: "menor_melhor",
    formatoPercentual: true,
    interpretacao: "Quanto menor, melhor. Valor alto indica estrutura pesada ou produção insuficiente",
    acao: "Revisão da estrutura administrativa e custos de suporte",
    historico: [0.105, 0.1, 0.095, 0.092, 0.09, 0.087],
    detalhes: {
      custoIndireto: 11200000,
      custoDireto: 128500000,
    },
  },
  {
    codigo: "MO",
    nome: "Margem Operacional",
    descricao: "Indicador final de saúde econômica da Micro-Unidade",
    formula: "(Fat - Impostos - CD - CI - DAG) / Faturamento",
    valor: -0.0065,
    meta: 0.06,
    anterior: -0.018,
    tipo: "maior_melhor",
    formatoPercentual: true,
    interpretacao: "Quanto maior, melhor. Valor negativo indica prejuízo operacional",
    acao: "Revisão completa de receita, custos e estrutura",
    historico: [-0.05, -0.04, -0.03, -0.018, 0.01, -0.0065],
    detalhes: {
      faturamento: 152800000,
      impostos: 12224000,
      custoDireto: 128500000,
      custoIndireto: 11200000,
      dag: 3820000,
    },
  },
]

// COMPOSIÇÃO DE CUSTOS
const composicaoCustos = {
  custoDireto: {
    nome: "Custo Direto (CD)",
    descricao: "Todo gasto diretamente atribuível à execução física da obra",
    total: 128500000,
    orcado: 130000000,
    itens: [
      { nome: "Materiais", orcado: 52000000, real: 51200000 },
      { nome: "Mão de Obra Produtiva", orcado: 45000000, real: 44800000 },
      { nome: "Equipamentos", orcado: 18000000, real: 18500000 },
      { nome: "Serviços/Subempreiteiros", orcado: 15000000, real: 14000000 },
    ],
  },
  custoIndireto: {
    nome: "Custo Indireto (CI)",
    descricao: "Gastos de gestão, suporte e operação sem vínculo direto com serviço específico",
    total: 11200000,
    orcado: 12000000,
    itens: [
      { nome: "Administração da Obra", orcado: 5500000, real: 5200000 },
      { nome: "Manutenção de Canteiro", orcado: 3000000, real: 2800000 },
      { nome: "Estrutura de Apoio", orcado: 2500000, real: 2400000 },
      { nome: "Seguros e Licenças", orcado: 1000000, real: 800000 },
    ],
  },
  dag: {
    nome: "DAG",
    descricao: "Despesas Administrativas Gerais - corporativas não alocadas diretamente à obra",
    total: 3820000,
    orcado: 4000000,
    percentualFaturamento: 2.5,
  },
}

// CICLO DE GOVERNANÇA
const cicloGovernanca = [
  { etapa: "1. Planejamento (CO)", status: "concluido", data: "Jan/25" },
  { etapa: "2. Execução (CR)", status: "em_andamento", data: "Jan/26" },
  { etapa: "3. Medição (KPIs)", status: "em_andamento", data: "Mensal" },
  { etapa: "4. Análise (Competência)", status: "em_andamento", data: "Mensal" },
  { etapa: "5. Decisão Gerencial", status: "pendente", data: "-" },
  { etapa: "6. Ação Corretiva", status: "pendente", data: "-" },
  { etapa: "7. Aprendizado", status: "pendente", data: "-" },
  { etapa: "8. Retroalimentação", status: "pendente", data: "-" },
]

// ALERTAS
const alertas = [
  { tipo: "critico", codigo: "MO", msg: "Margem Operacional negativa (-0.65%)", acao: "Revisão completa de custos" },
  { tipo: "atencao", codigo: "CI/CD", msg: "Custo Indireto 8.7% do CD - meta é 8%", acao: "Otimizar estrutura" },
  { tipo: "atencao", codigo: "F/CD", msg: "F/CD em 1.19 - meta é 1.25", acao: "Aumentar faturamento ou reduzir CD" },
  { tipo: "info", codigo: "CR/CO", msg: "CR/CO em 0.98 - economia de R$ 2.3M", acao: "Manter controle" },
]

// DADOS OPERACIONAIS
const dadosOperacional = {
  performance: {
    nome: "Performance",
    kpis: [
      { nome: "SPI", valor: 0.96, meta: 1.0, anterior: 0.95 },
      { nome: "CPI", valor: 1.04, meta: 1.0, anterior: 1.02 },
      { nome: "Produtividade", valor: 92, meta: 95, unidade: "%", anterior: 90 },
      { nome: "Eficiência", valor: 88, meta: 90, unidade: "%", anterior: 85 },
    ],
    historico: [0.92, 0.93, 0.94, 0.95, 0.95, 0.96],
  },
  suprimentos: {
    nome: "Suprimentos",
    kpis: [
      { nome: "OTIF", valor: 87, meta: 95, unidade: "%", anterior: 84 },
      { nome: "Lead Time", valor: 18, meta: 15, unidade: "d", anterior: 20, inverso: true },
      { nome: "Fornecedores", valor: 42, meta: 40, anterior: 40 },
      { nome: "Saving", valor: 2.1, meta: 1.5, unidade: "M", anterior: 1.8 },
    ],
    historico: [82, 83, 84, 84, 86, 87],
  },
}

// DADOS RISCOS
const dadosRiscos = {
  contratual: {
    nome: "Contratual",
    kpis: [
      { nome: "Avanço", valor: 67.4, meta: 70, unidade: "%", anterior: 64.0 },
      { nome: "Receita", valor: 165.2, meta: 171.5, unidade: "M", anterior: 156.0 },
      { nome: "Glosas", valor: 890, meta: 500, unidade: "k", anterior: 780, inverso: true },
      { nome: "Claims", valor: 2, meta: 0, anterior: 3, inverso: true },
    ],
    historico: [58, 60, 62, 64, 65, 67.4],
  },
  risco: {
    nome: "Gestão de Risco",
    kpis: [
      { nome: "Índice Risco", valor: 2.4, meta: 2.0, anterior: 2.6, inverso: true },
      { nome: "Críticos", valor: 3, meta: 0, anterior: 4, inverso: true },
      { nome: "Mitigados", valor: 12, meta: 15, anterior: 10 },
      { nome: "Exposição", valor: 4.5, meta: 3.0, unidade: "M", anterior: 5.2, inverso: true },
    ],
    historico: [3.0, 2.9, 2.8, 2.6, 2.5, 2.4],
  },
}

function IndicadoresContent() {
  const router = useRouter()
  const pathname = usePathname()

  const [selectedKPI, setSelectedKPI] = useState<any>(null)
  const [visaoCustos, setVisaoCustos] = useState<"grafico" | "tabela">("grafico")
  const [operacional, setOperacional] = useState({ tema: "performance", visao: "grafico" as "grafico" | "tabela" })
  const [riscos, setRiscos] = useState({ tema: "contratual", visao: "grafico" as "grafico" | "tabela" })

  const navegarPara = (rota: string) => router.push(rota)
  const isAtivo = (rota: string) => pathname === rota

  const meses = ["Jul", "Ago", "Set", "Out", "Nov", "Dez"]

  return (
    <div className="flex flex-col h-full overflow-auto bg-background">
      <div className="p-6 space-y-6">
        {/* Header com navegação */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-foreground">Indicadores & KPIs</h1>
              <Badge variant="outline">GC-04</Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Central de Inteligência e Análise - Módulo Gestão de Custos ERP-GNESIS
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 border rounded-lg p-1">
              <Button
                variant={isAtivo("/obra/gerencial/indicadores") ? "secondary" : "ghost"}
                size="sm"
                onClick={() => navegarPara("/obra/gerencial/indicadores")}
              >
                Geral
              </Button>
              <Button
                variant={isAtivo("/obra/gerencial/indicadores/analise-contratual") ? "secondary" : "ghost"}
                size="sm"
                onClick={() => navegarPara("/obra/gerencial/indicadores/analise-contratual")}
              >
                Contratual
              </Button>
              <Button
                variant={isAtivo("/obra/gerencial/indicadores/analise-financeira") ? "secondary" : "ghost"}
                size="sm"
                onClick={() => navegarPara("/obra/gerencial/indicadores/analise-financeira")}
              >
                Financeira
              </Button>
              <Button
                variant={isAtivo("/obra/gerencial/indicadores/analise-risco") ? "secondary" : "ghost"}
                size="sm"
                onClick={() => navegarPara("/obra/gerencial/indicadores/analise-risco")}
              >
                Risco
              </Button>
              <Button
                variant={isAtivo("/obra/gerencial/indicadores/analise-suprimentos") ? "secondary" : "ghost"}
                size="sm"
                onClick={() => navegarPara("/obra/gerencial/indicadores/analise-suprimentos")}
              >
                Suprimentos
              </Button>
              <Button
                variant={isAtivo("/obra/gerencial/indicadores/resultado-economico") ? "secondary" : "ghost"}
                size="sm"
                onClick={() => navegarPara("/obra/gerencial/indicadores/resultado-economico")}
              >
                Econômico
              </Button>
              <Button
                variant={isAtivo("/obra/gerencial/indicadores/performance") ? "secondary" : "ghost"}
                size="sm"
                onClick={() => navegarPara("/obra/gerencial/indicadores/performance")}
              >
                Performance
              </Button>
              <Button
                variant={isAtivo("/obra/gerencial/indicadores/cenarios") ? "secondary" : "ghost"}
                size="sm"
                onClick={() => navegarPara("/obra/gerencial/indicadores/cenarios")}
              >
                Cenários
              </Button>
            </div>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-1" />
              Exportar
            </Button>
          </div>
        </div>

        <Card className="border-t-4 border-t-primary">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Calculator className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-base font-semibold">KPIs Oficiais do Módulo</CardTitle>
                  <p className="text-xs text-muted-foreground">Conforme Manual ERP-GNESIS v1.0</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  Micro-Unidade: Obra Principal
                </Badge>
                <div className="flex items-center border rounded-md">
                  <Button
                    variant={visaoCustos === "grafico" ? "secondary" : "ghost"}
                    size="sm"
                    className="h-8 px-2"
                    onClick={() => setVisaoCustos("grafico")}
                  >
                    <BarChart2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={visaoCustos === "tabela" ? "secondary" : "ghost"}
                    size="sm"
                    className="h-8 px-2"
                    onClick={() => setVisaoCustos("tabela")}
                  >
                    <Table className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            {visaoCustos === "grafico" ? (
              <div className="grid grid-cols-4 gap-4">
                {kpisOficiais.map((kpi) => (
                  <KPICardOficial
                    key={kpi.codigo}
                    codigo={kpi.codigo}
                    nome={kpi.nome}
                    valor={kpi.valor}
                    meta={kpi.meta}
                    anterior={kpi.anterior}
                    formula={kpi.formula}
                    historico={kpi.historico}
                    icone={Calculator}
                    formato={kpi.formatoPercentual ? "percentual" : "decimal"}
                    inverso={kpi.tipo === "menor_melhor"}
                    onClick={() => setSelectedKPI(kpi)}
                  />
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-3 font-medium">Código</th>
                      <th className="text-left py-2 px-3 font-medium">Indicador</th>
                      <th className="text-right py-2 px-3 font-medium">Valor</th>
                      <th className="text-right py-2 px-3 font-medium">Meta</th>
                      <th className="text-right py-2 px-3 font-medium">Anterior</th>
                      <th className="text-right py-2 px-3 font-medium">Variação</th>
                      <th className="text-center py-2 px-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {kpisOficiais.map((kpi) => {
                      const variacao = ((kpi.valor - kpi.anterior) / Math.abs(kpi.anterior)) * 100
                      const atingiuMeta = kpi.tipo === "menor_melhor" ? kpi.valor <= kpi.meta : kpi.valor >= kpi.meta
                      return (
                        <tr
                          key={kpi.codigo}
                          className="border-b hover:bg-muted/50 cursor-pointer"
                          onClick={() => setSelectedKPI(kpi)}
                        >
                          <td className="py-2 px-3 font-mono font-semibold">{kpi.codigo}</td>
                          <td className="py-2 px-3">{kpi.nome}</td>
                          <td className="py-2 px-3 text-right font-semibold">
                            {kpi.formatoPercentual ? `${(kpi.valor * 100).toFixed(2)}%` : kpi.valor.toFixed(2)}
                          </td>
                          <td className="py-2 px-3 text-right text-muted-foreground">
                            {kpi.formatoPercentual ? `${(kpi.meta * 100).toFixed(2)}%` : kpi.meta.toFixed(2)}
                          </td>
                          <td className="py-2 px-3 text-right text-muted-foreground">
                            {kpi.formatoPercentual ? `${(kpi.anterior * 100).toFixed(2)}%` : kpi.anterior.toFixed(2)}
                          </td>
                          <td className={`py-2 px-3 text-right ${variacao >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                            {variacao >= 0 ? "+" : ""}
                            {variacao.toFixed(1)}%
                          </td>
                          <td className="py-2 px-3 text-center">
                            <Badge variant={atingiuMeta ? "default" : "destructive"} className="text-xs">
                              {atingiuMeta ? "OK" : "Atenção"}
                            </Badge>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        <ComposicaoCustos dados={composicaoCustos} onSelectItem={(item) => setSelectedKPI(item)} />

        <div className="grid grid-cols-2 gap-6">
          <CardConsolidado
            titulo="Análise Operacional"
            temas={[
              { id: "performance", nome: "Performance" },
              { id: "suprimentos", nome: "Suprimentos" },
            ]}
            temaSelecionado={operacional.tema}
            visao={operacional.visao}
            onChangeTema={(tema) => setOperacional((prev) => ({ ...prev, tema }))}
            onChangeVisao={(visao) => setOperacional((prev) => ({ ...prev, visao }))}
            dados={dadosOperacional[operacional.tema as keyof typeof dadosOperacional]}
            meses={meses}
            onSelectKPI={(kpi) => setSelectedKPI(kpi)}
          />

          <CardConsolidado
            titulo="Análise de Riscos"
            temas={[
              { id: "contratual", nome: "Contratual" },
              { id: "risco", nome: "Gestão de Risco" },
            ]}
            temaSelecionado={riscos.tema}
            visao={riscos.visao}
            onChangeTema={(tema) => setRiscos((prev) => ({ ...prev, tema }))}
            onChangeVisao={(visao) => setRiscos((prev) => ({ ...prev, visao }))}
            dados={dadosRiscos[riscos.tema as keyof typeof dadosRiscos]}
            meses={meses}
            onSelectKPI={(kpi) => setSelectedKPI(kpi)}
          />
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-5">
            <CicloGovernanca etapas={cicloGovernanca} />
          </div>
          <div className="col-span-7">
            <AlertasModulo alertas={alertas} onSelectAlerta={(alerta) => setSelectedKPI(alerta)} />
          </div>
        </div>
      </div>

      <Sheet open={!!selectedKPI} onOpenChange={() => setSelectedKPI(null)}>
        <SheetContent className="sm:max-w-lg">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              {selectedKPI?.codigo && (
                <Badge variant="outline" className="font-mono">
                  {selectedKPI.codigo}
                </Badge>
              )}
              {selectedKPI?.nome || selectedKPI?.msg || "Detalhes"}
            </SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-6">
            {selectedKPI?.formula && (
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-sm font-medium mb-1">Fórmula</p>
                <p className="text-sm text-muted-foreground font-mono">{selectedKPI.formula}</p>
              </div>
            )}
            {selectedKPI?.interpretacao && (
              <div className="p-4 rounded-lg border">
                <p className="text-sm font-medium mb-1 flex items-center gap-2">
                  <Info className="h-4 w-4" /> Interpretação
                </p>
                <p className="text-sm text-muted-foreground">{selectedKPI.interpretacao}</p>
              </div>
            )}
            {selectedKPI?.acao && (
              <div className="p-4 rounded-lg border border-primary/30 bg-primary/5">
                <p className="text-sm font-medium mb-1">Ação Recomendada</p>
                <p className="text-sm text-muted-foreground">{selectedKPI.acao}</p>
              </div>
            )}
            {selectedKPI?.historico && (
              <div>
                <p className="text-sm font-medium mb-3">Histórico (6 meses)</p>
                <div className="flex items-end gap-2 h-24">
                  {selectedKPI.historico.map((valor: number, i: number) => {
                    const max = Math.max(...selectedKPI.historico)
                    const altura = (valor / max) * 100
                    return (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <span className="text-xs text-muted-foreground">
                          {typeof valor === "number" && valor < 10 ? valor.toFixed(2) : valor}
                        </span>
                        <div className="w-full bg-primary/80 rounded-t" style={{ height: `${altura}%` }} />
                        <span className="text-xs text-muted-foreground">{meses[i]}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default function IndicadoresPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      }
    >
      <IndicadoresContent />
    </Suspense>
  )
}
