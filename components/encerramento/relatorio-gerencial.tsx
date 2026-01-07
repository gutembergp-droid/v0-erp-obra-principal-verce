"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  FileText,
  Printer,
  Download,
  Building2,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  AlertTriangle,
  Clock,
  Users,
  HardHat,
  ShieldCheck,
  Briefcase,
} from "lucide-react"

interface RelatorioGerencialProps {
  competencia: string
  contrato: string
  status: "previa" | "consolidado"
  numeroRelatorio?: string
  dadosConsolidados: {
    administrativoFinanceiro: {
      dre: {
        receitaBruta: number
        deducoes: number
        receitaLiquida: number
        custoDireto: number
        margemContribuicao: number
        dag: number
        resultadoOperacional: number
        margemOperacional: number
      }
      fluxoCaixa: {
        saldoInicial: number
        entradas: number
        saidas: number
        saldoFinal: number
        geracaoCaixa: number
      }
      rh: {
        efetivo: number
        admissoes: number
        demissoes: number
        horasExtras: number
        absenteismo: number
      }
    }
    engenharia: {
      spi: number
      avanco: number
      projetos: {
        entregues: number
        pendentes: number
        total: number
      }
      desviosCronograma: number
    }
    producaoComercial: {
      fcd: number
      crco: number
      cicd: number
      medicaoAprovada: number
      medicaoPendente: number
      produtividade: number
    }
    qsms: {
      ncsAbertas: number
      ncsFechadas: number
      acidentes: number
      diasSemAcidentes: number
      treinamentos: number
      auditorias: number
    }
    parecerGerente: string
    planosAcao: { descricao: string; status: string; responsavel: string }[]
  }
  gerenteNome: string
  dataGeracao?: Date
}

// Funcao para gerar numero do relatorio
function gerarNumeroRelatorio(competencia: string, status: "previa" | "consolidado"): string {
  const [mes, ano] = competencia.split("/")
  const mesNum =
    {
      Janeiro: "01",
      Fevereiro: "02",
      Marco: "03",
      Abril: "04",
      Maio: "05",
      Junho: "06",
      Julho: "07",
      Agosto: "08",
      Setembro: "09",
      Outubro: "10",
      Novembro: "11",
      Dezembro: "12",
    }[mes] || "00"
  const prefixo = status === "consolidado" ? "RGM" : "PRV"
  return `${prefixo}-${ano}-${mesNum}`
}

function formatCurrency(value: number): string {
  if (value === undefined || value === null) return "R$ 0"
  if (Math.abs(value) >= 1000000) {
    return `R$ ${(value / 1000000).toFixed(2).replace(".", ",")} Mi`
  }
  if (Math.abs(value) >= 1000) {
    return `R$ ${(value / 1000).toFixed(0)} mil`
  }
  return `R$ ${value.toLocaleString("pt-BR")}`
}

function formatPercent(value: number): string {
  if (value === undefined || value === null) return "0%"
  return `${value.toFixed(2).replace(".", ",")}%`
}

export function RelatorioGerencial({
  competencia,
  contrato,
  status,
  dadosConsolidados,
  gerenteNome,
  dataGeracao = new Date(),
}: RelatorioGerencialProps) {
  const [open, setOpen] = useState(false)
  const reportRef = useRef<HTMLDivElement>(null)
  const numeroRelatorio = gerarNumeroRelatorio(competencia, status)

  const handlePrint = () => {
    window.print()
  }

  const { administrativoFinanceiro, engenharia, producaoComercial, qsms, parecerGerente, planosAcao } =
    dadosConsolidados

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 bg-transparent">
          <FileText className="h-4 w-4" />
          Gerar Relatorio
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto print:max-w-none print:max-h-none print:overflow-visible">
        <DialogHeader className="print:hidden">
          <DialogTitle>Relatorio Gerencial Mensal</DialogTitle>
        </DialogHeader>

        {/* Botoes de acao */}
        <div className="flex gap-2 justify-end print:hidden">
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-2" />
            Imprimir
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar PDF
          </Button>
        </div>

        {/* RELATORIO */}
        <div ref={reportRef} className="bg-white p-6 space-y-6 print:p-0">
          {/* CABECALHO COM STATUS */}
          <div className={`p-4 rounded-lg text-center ${status === "consolidado" ? "bg-emerald-600" : "bg-amber-500"}`}>
            <p className="text-white font-bold text-lg tracking-widest">
              {status === "consolidado" ? "OFICIAL - CONSOLIDADO" : "PREVIA - NAO CONSOLIDADO"}
            </p>
          </div>

          {/* IDENTIFICACAO DO RELATORIO */}
          <div className="border-b-2 border-gray-800 pb-4">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">RELATORIO GERENCIAL MENSAL</h1>
                <p className="text-gray-600 mt-1">
                  Contrato: <span className="font-semibold">{contrato}</span>
                </p>
                <p className="text-gray-600">
                  Competencia: <span className="font-semibold text-lg">{competencia.toUpperCase()}</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-gray-900">{numeroRelatorio}</p>
                <p className="text-sm text-gray-500">
                  Gerado em: {dataGeracao.toLocaleDateString("pt-BR")} as{" "}
                  {dataGeracao.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                </p>
                <p className="text-sm text-gray-500">Responsavel: {gerenteNome}</p>
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* 1. RESULTADO ADMINISTRATIVO, FINANCEIRO E ECONOMICO */}
          {/* ============================================================== */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">1. RESULTADO ADMINISTRATIVO, FINANCEIRO E ECONOMICO</h2>
            </div>

            {/* 1.1 DRE */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">1.1 Demonstrativo de Resultado (DRE)</h3>
              <Card className="p-4">
                <table className="w-full text-sm">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 font-semibold text-emerald-700">RECEITA BRUTA</td>
                      <td className="py-2 text-right font-bold text-emerald-700">
                        {formatCurrency(administrativoFinanceiro.dre.receitaBruta)}
                      </td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="py-2 pl-4 text-gray-600">(-) Deducoes (PIS/COFINS/ISS)</td>
                      <td className="py-2 text-right text-red-600">
                        ({formatCurrency(administrativoFinanceiro.dre.deducoes)})
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-semibold">(=) RECEITA LIQUIDA</td>
                      <td className="py-2 text-right font-bold">
                        {formatCurrency(administrativoFinanceiro.dre.receitaLiquida)}
                      </td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="py-2 pl-4 text-gray-600">(-) Custos Diretos</td>
                      <td className="py-2 text-right text-red-600">
                        ({formatCurrency(administrativoFinanceiro.dre.custoDireto)})
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-semibold text-blue-700">(=) MARGEM DE CONTRIBUICAO</td>
                      <td className="py-2 text-right font-bold text-blue-700">
                        {formatCurrency(administrativoFinanceiro.dre.margemContribuicao)}
                      </td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="py-2 pl-4 text-gray-600">(-) Despesas Adm/Gerais (DAG)</td>
                      <td className="py-2 text-right text-red-600">
                        ({formatCurrency(administrativoFinanceiro.dre.dag)})
                      </td>
                    </tr>
                    <tr className="bg-emerald-50">
                      <td className="py-3 font-bold text-emerald-800">(=) RESULTADO OPERACIONAL</td>
                      <td className="py-3 text-right font-bold text-emerald-800 text-lg">
                        {formatCurrency(administrativoFinanceiro.dre.resultadoOperacional)}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 text-gray-600">Margem Operacional</td>
                      <td className="py-2 text-right font-semibold">
                        {formatPercent(administrativoFinanceiro.dre.margemOperacional)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Card>
            </div>

            {/* 1.2 Fluxo de Caixa */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">1.2 Fluxo de Caixa</h3>
              <div className="grid grid-cols-5 gap-3">
                <Card className="p-3 text-center">
                  <p className="text-xs text-gray-500">Saldo Inicial</p>
                  <p className="font-bold text-gray-900">
                    {formatCurrency(administrativoFinanceiro.fluxoCaixa.saldoInicial)}
                  </p>
                </Card>
                <Card className="p-3 text-center bg-emerald-50">
                  <p className="text-xs text-gray-500">Entradas</p>
                  <p className="font-bold text-emerald-600">
                    +{formatCurrency(administrativoFinanceiro.fluxoCaixa.entradas)}
                  </p>
                </Card>
                <Card className="p-3 text-center bg-red-50">
                  <p className="text-xs text-gray-500">Saidas</p>
                  <p className="font-bold text-red-600">
                    -{formatCurrency(administrativoFinanceiro.fluxoCaixa.saidas)}
                  </p>
                </Card>
                <Card className="p-3 text-center bg-blue-50">
                  <p className="text-xs text-gray-500">Saldo Final</p>
                  <p className="font-bold text-blue-600">
                    {formatCurrency(administrativoFinanceiro.fluxoCaixa.saldoFinal)}
                  </p>
                </Card>
                <Card className="p-3 text-center bg-purple-50">
                  <p className="text-xs text-gray-500">Geracao Caixa</p>
                  <p className="font-bold text-purple-600">
                    {formatCurrency(administrativoFinanceiro.fluxoCaixa.geracaoCaixa)}
                  </p>
                </Card>
              </div>
            </div>

            {/* 1.3 Recursos Humanos */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">1.3 Recursos Humanos</h3>
              <div className="grid grid-cols-5 gap-3">
                <Card className="p-3 text-center">
                  <Users className="h-5 w-5 mx-auto mb-1 text-gray-600" />
                  <p className="text-xs text-gray-500">Efetivo</p>
                  <p className="font-bold">{administrativoFinanceiro.rh.efetivo}</p>
                </Card>
                <Card className="p-3 text-center">
                  <p className="text-xs text-gray-500">Admissoes</p>
                  <p className="font-bold text-emerald-600">+{administrativoFinanceiro.rh.admissoes}</p>
                </Card>
                <Card className="p-3 text-center">
                  <p className="text-xs text-gray-500">Demissoes</p>
                  <p className="font-bold text-red-600">-{administrativoFinanceiro.rh.demissoes}</p>
                </Card>
                <Card className="p-3 text-center">
                  <p className="text-xs text-gray-500">Horas Extras</p>
                  <p className="font-bold">{administrativoFinanceiro.rh.horasExtras}h</p>
                </Card>
                <Card className="p-3 text-center">
                  <p className="text-xs text-gray-500">Absenteismo</p>
                  <p className="font-bold">{administrativoFinanceiro.rh.absenteismo}%</p>
                </Card>
              </div>
            </div>
          </section>

          <Separator className="my-6" />

          {/* ============================================================== */}
          {/* 2. ENGENHARIA */}
          {/* ============================================================== */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <HardHat className="h-6 w-6 text-orange-600" />
              <h2 className="text-xl font-bold text-gray-900">2. ENGENHARIA</h2>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Planejamento */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">2.1 Planejamento e Cronograma</h3>
                <Card className="p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-gray-50 rounded">
                      <p className="text-sm text-gray-500">SPI</p>
                      <p
                        className={`text-2xl font-bold ${engenharia.spi >= 1 ? "text-emerald-600" : "text-amber-600"}`}
                      >
                        {engenharia.spi.toFixed(2)}
                      </p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded">
                      <p className="text-sm text-gray-500">Avanco Fisico</p>
                      <p className="text-2xl font-bold text-blue-600">{engenharia.avanco}%</p>
                    </div>
                  </div>
                  <div className="mt-3 p-2 bg-amber-50 rounded text-center">
                    <p className="text-sm text-gray-600">Desvio Cronograma</p>
                    <p
                      className={`font-bold ${engenharia.desviosCronograma > 0 ? "text-red-600" : "text-emerald-600"}`}
                    >
                      {engenharia.desviosCronograma > 0 ? "+" : ""}
                      {engenharia.desviosCronograma} dias
                    </p>
                  </div>
                </Card>
              </div>

              {/* Projetos */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">2.2 Status dos Projetos</h3>
                <Card className="p-4">
                  <div className="flex items-center justify-around">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
                        <CheckCircle className="h-8 w-8 text-emerald-600" />
                      </div>
                      <p className="text-2xl font-bold text-emerald-600 mt-2">{engenharia.projetos.entregues}</p>
                      <p className="text-xs text-gray-500">Entregues</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto">
                        <Clock className="h-8 w-8 text-amber-600" />
                      </div>
                      <p className="text-2xl font-bold text-amber-600 mt-2">{engenharia.projetos.pendentes}</p>
                      <p className="text-xs text-gray-500">Pendentes</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto">
                        <p className="text-xl font-bold text-blue-600">{engenharia.projetos.total}</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">Total</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </section>

          <Separator className="my-6" />

          {/* ============================================================== */}
          {/* 3. PRODUCAO E COMERCIAL */}
          {/* ============================================================== */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="h-6 w-6 text-purple-600" />
              <h2 className="text-xl font-bold text-gray-900">3. PRODUCAO E COMERCIAL</h2>
            </div>

            {/* KPIs Principais */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">3.1 Indicadores de Performance</h3>
              <div className="grid grid-cols-5 gap-3">
                <Card
                  className={`p-4 text-center ${producaoComercial.fcd >= 1 ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200"}`}
                >
                  <p className="text-sm text-gray-600 font-medium">F/CD</p>
                  <p
                    className={`text-2xl font-bold ${producaoComercial.fcd >= 1 ? "text-emerald-600" : "text-red-600"}`}
                  >
                    {producaoComercial.fcd.toFixed(2)}
                  </p>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    {producaoComercial.fcd >= 1 ? (
                      <TrendingUp className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                    <span className="text-xs text-gray-500">Meta: 1.00</span>
                  </div>
                </Card>
                <Card
                  className={`p-4 text-center ${producaoComercial.crco <= 1 ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200"}`}
                >
                  <p className="text-sm text-gray-600 font-medium">CR/CO</p>
                  <p
                    className={`text-2xl font-bold ${producaoComercial.crco <= 1 ? "text-emerald-600" : "text-red-600"}`}
                  >
                    {producaoComercial.crco.toFixed(2)}
                  </p>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    {producaoComercial.crco <= 1 ? (
                      <TrendingUp className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                    <span className="text-xs text-gray-500">Meta: 1.00</span>
                  </div>
                </Card>
                <Card
                  className={`p-4 text-center ${producaoComercial.cicd <= 0.05 ? "bg-emerald-50 border-emerald-200" : "bg-amber-50 border-amber-200"}`}
                >
                  <p className="text-sm text-gray-600 font-medium">CI/CD</p>
                  <p
                    className={`text-2xl font-bold ${producaoComercial.cicd <= 0.05 ? "text-emerald-600" : "text-amber-600"}`}
                  >
                    {(producaoComercial.cicd * 100).toFixed(1)}%
                  </p>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <span className="text-xs text-gray-500">Meta: 5%</span>
                  </div>
                </Card>
                <Card className="p-4 text-center bg-blue-50 border-blue-200">
                  <p className="text-sm text-gray-600 font-medium">Produtividade</p>
                  <p className="text-2xl font-bold text-blue-600">{producaoComercial.produtividade}%</p>
                </Card>
                <Card className="p-4 text-center">
                  <p className="text-sm text-gray-600 font-medium">Medicao</p>
                  <p className="text-lg font-bold text-emerald-600">
                    {formatCurrency(producaoComercial.medicaoAprovada)}
                  </p>
                  <p className="text-xs text-amber-600">Pend: {formatCurrency(producaoComercial.medicaoPendente)}</p>
                </Card>
              </div>
            </div>
          </section>

          <Separator className="my-6" />

          {/* ============================================================== */}
          {/* 4. QSMS */}
          {/* ============================================================== */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="h-6 w-6 text-teal-600" />
              <h2 className="text-xl font-bold text-gray-900">4. QSMS - QUALIDADE, SEGURANCA, MEIO AMBIENTE E SAUDE</h2>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Qualidade */}
              <Card className="p-4">
                <h3 className="font-semibold text-gray-800 mb-3">4.1 Qualidade</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-amber-50 rounded">
                    <AlertTriangle className="h-5 w-5 mx-auto mb-1 text-amber-600" />
                    <p className="text-2xl font-bold text-amber-600">{qsms.ncsAbertas}</p>
                    <p className="text-xs text-gray-500">NCs Abertas</p>
                  </div>
                  <div className="text-center p-3 bg-emerald-50 rounded">
                    <CheckCircle className="h-5 w-5 mx-auto mb-1 text-emerald-600" />
                    <p className="text-2xl font-bold text-emerald-600">{qsms.ncsFechadas}</p>
                    <p className="text-xs text-gray-500">NCs Fechadas</p>
                  </div>
                </div>
                <div className="mt-3 text-center p-2 bg-gray-50 rounded">
                  <p className="text-sm text-gray-600">
                    Auditorias Realizadas: <span className="font-bold">{qsms.auditorias}</span>
                  </p>
                </div>
              </Card>

              {/* Seguranca */}
              <Card className="p-4">
                <h3 className="font-semibold text-gray-800 mb-3">4.2 Seguranca</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className={`text-center p-3 rounded ${qsms.acidentes === 0 ? "bg-emerald-50" : "bg-red-50"}`}>
                    <p className={`text-2xl font-bold ${qsms.acidentes === 0 ? "text-emerald-600" : "text-red-600"}`}>
                      {qsms.acidentes}
                    </p>
                    <p className="text-xs text-gray-500">Acidentes</p>
                  </div>
                  <div className="text-center p-3 bg-emerald-50 rounded">
                    <p className="text-2xl font-bold text-emerald-600">{qsms.diasSemAcidentes}</p>
                    <p className="text-xs text-gray-500">Dias s/ Acidentes</p>
                  </div>
                </div>
                <div className="mt-3 text-center p-2 bg-gray-50 rounded">
                  <p className="text-sm text-gray-600">
                    Treinamentos: <span className="font-bold">{qsms.treinamentos}</span>
                  </p>
                </div>
              </Card>
            </div>
          </section>

          <Separator className="my-6" />

          {/* ============================================================== */}
          {/* 5. PARECER GERENCIAL */}
          {/* ============================================================== */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <FileText className="h-6 w-6 text-gray-600" />
              <h2 className="text-xl font-bold text-gray-900">5. PARECER GERENCIAL</h2>
            </div>

            {/* 5.1 Analise */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">5.1 Analise do Periodo</h3>
              <Card className="p-4 bg-gray-50">
                <p className="text-gray-700 whitespace-pre-wrap">{parecerGerente || "Nenhum parecer registrado."}</p>
              </Card>
            </div>

            {/* 5.2 Planos de Acao */}
            {planosAcao && planosAcao.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">5.2 Planos de Acao</h3>
                <Card className="p-4">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Descricao</th>
                        <th className="text-center py-2">Status</th>
                        <th className="text-right py-2">Responsavel</th>
                      </tr>
                    </thead>
                    <tbody>
                      {planosAcao.map((plano, idx) => (
                        <tr key={idx} className="border-b">
                          <td className="py-2">{plano.descricao}</td>
                          <td className="py-2 text-center">
                            <Badge
                              variant={
                                plano.status === "Concluido"
                                  ? "default"
                                  : plano.status === "Em andamento"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {plano.status}
                            </Badge>
                          </td>
                          <td className="py-2 text-right">{plano.responsavel}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Card>
              </div>
            )}

            {/* Assinatura */}
            <div className="mt-8 pt-6 border-t-2 border-gray-300">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-sm text-gray-500">Assinatura Digital</p>
                  <div className="w-64 border-b-2 border-gray-400 mt-8 mb-2"></div>
                  <p className="font-semibold">{gerenteNome}</p>
                  <p className="text-sm text-gray-500">Gerente de Contrato</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Data</p>
                  <p className="font-semibold">{dataGeracao.toLocaleDateString("pt-BR")}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Rodape */}
          <div className="mt-8 pt-4 border-t text-center text-xs text-gray-400">
            <p>
              {numeroRelatorio} | Gerado pelo Sistema de Gestao de Obras | {dataGeracao.toLocaleDateString("pt-BR")}{" "}
              {dataGeracao.toLocaleTimeString("pt-BR")}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
