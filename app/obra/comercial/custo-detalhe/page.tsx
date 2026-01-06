"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  FileText,
  AlertTriangle,
  CheckCircle,
  ChevronLeft,
  TrendingUp,
  TrendingDown,
  Package,
  Users,
  Wrench,
  Boxes,
  X,
  History,
  ClipboardList,
} from "lucide-react"

// Dados mockados do servico selecionado
const servicoAtual = {
  id: 1,
  nome: "Pavimentacao - CBUQ",
  pacote: "Pavimentacao",
  custoBaseline: 4850000,
  custoRealizado: 5300000,
  desvio: 450000,
  desvioPercent: 9.28,
  status: "critico",
}

const composicaoCusto = [
  {
    id: 1,
    tipo: "Material",
    descricao: "CBUQ - Concreto Betuminoso",
    quantidade: 12500,
    unidade: "t",
    custoUnitario: 285,
    custoTotal: 3562500,
    origem: "Suprimentos",
    status: "critico",
  },
  {
    id: 2,
    tipo: "Material",
    descricao: "Emulsao Asfaltica RR-2C",
    quantidade: 85000,
    unidade: "L",
    custoUnitario: 4.2,
    custoTotal: 357000,
    origem: "Suprimentos",
    status: "ok",
  },
  {
    id: 3,
    tipo: "MO",
    descricao: "Equipe de Pavimentacao",
    quantidade: 1800,
    unidade: "HH",
    custoUnitario: 95,
    custoTotal: 171000,
    origem: "Producao",
    status: "atencao",
  },
  {
    id: 4,
    tipo: "Equipamento",
    descricao: "Vibroacabadora de Asfalto",
    quantidade: 320,
    unidade: "HM",
    custoUnitario: 580,
    custoTotal: 185600,
    origem: "Producao",
    status: "ok",
  },
  {
    id: 5,
    tipo: "Equipamento",
    descricao: "Rolo Compactador Tandem",
    quantidade: 480,
    unidade: "HM",
    custoUnitario: 320,
    custoTotal: 153600,
    origem: "Producao",
    status: "ok",
  },
  {
    id: 6,
    tipo: "Servico",
    descricao: "Transporte de CBUQ",
    quantidade: 12500,
    unidade: "t",
    custoUnitario: 45,
    custoTotal: 562500,
    origem: "Suprimentos",
    status: "atencao",
  },
  {
    id: 7,
    tipo: "Indireto",
    descricao: "Apoio Tecnico e Supervisao",
    quantidade: 1,
    unidade: "vb",
    custoUnitario: 307800,
    custoTotal: 307800,
    origem: "Indireto",
    status: "ok",
  },
]

const comparativoRecursos = [
  { tipo: "Material", planejado: 3600000, realizado: 3919500, desvio: 319500, tendencia: "piora" },
  { tipo: "Mao de Obra", planejado: 150000, realizado: 171000, desvio: 21000, tendencia: "estavel" },
  { tipo: "Equipamento", planejado: 320000, realizado: 339200, desvio: 19200, tendencia: "estavel" },
  { tipo: "Servico", planejado: 500000, realizado: 562500, desvio: 62500, tendencia: "piora" },
  { tipo: "Indireto", planejado: 280000, realizado: 307800, desvio: 27800, tendencia: "estavel" },
]

const desviosServico = [
  {
    id: 1,
    tipo: "Insumo",
    descricao: "Aumento do preco do CBUQ apos reajuste contratual da usina",
    impacto: 285000,
    situacao: "justificado",
  },
  {
    id: 2,
    tipo: "Quantidade",
    descricao: "Consumo de CBUQ 8% acima do previsto por irregularidade da base",
    impacto: 95000,
    situacao: "em_analise",
  },
  {
    id: 3,
    tipo: "Produtividade",
    descricao: "Reducao de produtividade por chuvas no periodo",
    impacto: 70000,
    situacao: "pendente",
  },
]

const servicosDisponiveis = [
  { id: "1", nome: "Pavimentacao - CBUQ" },
  { id: "2", nome: "Terraplanagem - Corte" },
  { id: "3", nome: "Drenagem - BSTC" },
  { id: "4", nome: "OAE - Concreto Estrutural" },
  { id: "5", nome: "Sinalizacao Horizontal" },
]

export default function CustoDetalhePage() {
  const [competencia, setCompetencia] = useState("2025-01")
  const [servicoSelecionado, setServicoSelecionado] = useState("1")
  const [desvioSelecionado, setDesvioSelecionado] = useState<(typeof desviosServico)[0] | null>(null)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("pt-BR").format(value)
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

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case "Material":
        return <Package className="w-4 h-4 text-primary" />
      case "MO":
        return <Users className="w-4 h-4 text-primary" />
      case "Equipamento":
        return <Wrench className="w-4 h-4 text-primary" />
      case "Servico":
        return <Boxes className="w-4 h-4 text-primary" />
      case "Indireto":
        return <FileText className="w-4 h-4 text-primary" />
      default:
        return <FileText className="w-4 h-4 text-primary" />
    }
  }

  const getTendenciaIcon = (tendencia: string) => {
    if (tendencia === "piora") {
      return <TrendingUp className="w-4 h-4 text-destructive" />
    } else if (tendencia === "melhora") {
      return <TrendingDown className="w-4 h-4 text-primary" />
    }
    return <span className="text-muted-foreground">—</span>
  }

  const totalComposicao = composicaoCusto.reduce((acc, item) => acc + item.custoTotal, 0)

  return (
    <div className="flex-1 overflow-auto bg-background">
      <div className="p-6 space-y-6">
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-foreground">Detalhe de Custo por Servico</h1>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                CM-02
              </Badge>
            </div>
            <p className="text-muted-foreground mt-1">Analise economica por pacote de servico</p>
          </div>

          <div className="flex items-center gap-3">
            <Select value={servicoSelecionado} onValueChange={setServicoSelecionado}>
              <SelectTrigger className="w-[220px] bg-card border-border">
                <SelectValue placeholder="Selecione o servico" />
              </SelectTrigger>
              <SelectContent>
                {servicosDisponiveis.map((s) => (
                  <SelectItem key={s.id} value={s.id}>
                    {s.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

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
          </div>
        </div>

        {/* BLOCO 1 - RESUMO DO SERVICO */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Resumo do Servico
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
              <div className="lg:col-span-2 p-4 bg-muted/30 rounded-lg">
                <p className="text-xs text-muted-foreground">Servico / Pacote</p>
                <p className="text-lg font-bold text-foreground mt-1">{servicoAtual.nome}</p>
                <p className="text-sm text-muted-foreground">{servicoAtual.pacote}</p>
              </div>

              <div className="p-4 bg-muted/30 rounded-lg">
                <p className="text-xs text-muted-foreground">Custo Planejado</p>
                <p className="text-lg font-bold text-foreground mt-1">{formatCurrency(servicoAtual.custoBaseline)}</p>
              </div>

              <div className="p-4 bg-muted/30 rounded-lg">
                <p className="text-xs text-muted-foreground">Custo Realizado</p>
                <p className="text-lg font-bold text-foreground mt-1">{formatCurrency(servicoAtual.custoRealizado)}</p>
              </div>

              <div className="p-4 bg-destructive/5 rounded-lg border border-destructive/20">
                <p className="text-xs text-muted-foreground">Desvio (R$ e %)</p>
                <p className="text-lg font-bold text-destructive mt-1">+{formatCurrency(servicoAtual.desvio)}</p>
                <p className="text-sm text-destructive">+{servicoAtual.desvioPercent.toFixed(2)}%</p>
              </div>

              <div className="p-4 bg-muted/30 rounded-lg flex flex-col justify-center items-center">
                <p className="text-xs text-muted-foreground mb-2">Status</p>
                {getStatusBadge(servicoAtual.status)}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* BLOCO 2 - COMPOSICAO DO CUSTO DO SERVICO */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold text-foreground">Composicao do Custo do Servico</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left p-3 font-medium text-muted-foreground">Tipo</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">Descricao</th>
                    <th className="text-right p-3 font-medium text-muted-foreground">Qtd</th>
                    <th className="text-center p-3 font-medium text-muted-foreground">Un</th>
                    <th className="text-right p-3 font-medium text-muted-foreground">Custo Unit.</th>
                    <th className="text-right p-3 font-medium text-muted-foreground">Custo Total</th>
                    <th className="text-center p-3 font-medium text-muted-foreground">Origem</th>
                    <th className="text-center p-3 font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {composicaoCusto.map((item) => (
                    <tr key={item.id} className="border-b border-border hover:bg-muted/20 transition-colors">
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          {getTipoIcon(item.tipo)}
                          <span className="text-foreground font-medium">{item.tipo}</span>
                        </div>
                      </td>
                      <td className="p-3 text-foreground">{item.descricao}</td>
                      <td className="p-3 text-right text-muted-foreground">{formatNumber(item.quantidade)}</td>
                      <td className="p-3 text-center text-muted-foreground">{item.unidade}</td>
                      <td className="p-3 text-right text-muted-foreground">{formatCurrency(item.custoUnitario)}</td>
                      <td className="p-3 text-right text-foreground font-medium">{formatCurrency(item.custoTotal)}</td>
                      <td className="p-3 text-center">
                        <Badge variant="outline" className="border-border bg-muted/50 text-muted-foreground">
                          {item.origem}
                        </Badge>
                      </td>
                      <td className="p-3 text-center">{getStatusBadge(item.status)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-muted/50 font-semibold">
                    <td colSpan={5} className="p-3 text-foreground">
                      TOTAL DA COMPOSICAO
                    </td>
                    <td className="p-3 text-right text-foreground">{formatCurrency(totalComposicao)}</td>
                    <td colSpan={2}></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* BLOCO 3 - COMPARATIVO PLANEJADO x REALIZADO POR RECURSO */}
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
                      <th className="text-left p-3 font-medium text-muted-foreground">Tipo de Recurso</th>
                      <th className="text-right p-3 font-medium text-muted-foreground">Planejado</th>
                      <th className="text-right p-3 font-medium text-muted-foreground">Realizado</th>
                      <th className="text-right p-3 font-medium text-muted-foreground">Diferenca</th>
                      <th className="text-center p-3 font-medium text-muted-foreground">Tendencia</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparativoRecursos.map((rec, idx) => (
                      <tr key={idx} className="border-b border-border hover:bg-muted/20 transition-colors">
                        <td className="p-3 font-medium text-foreground">{rec.tipo}</td>
                        <td className="p-3 text-right text-muted-foreground">{formatCurrency(rec.planejado)}</td>
                        <td className="p-3 text-right text-foreground">{formatCurrency(rec.realizado)}</td>
                        <td className="p-3 text-right text-destructive font-medium">+{formatCurrency(rec.desvio)}</td>
                        <td className="p-3 text-center">{getTendenciaIcon(rec.tendencia)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 border-t border-border">
                <p className="text-xs text-muted-foreground italic border-l-2 border-primary/30 pl-3">
                  "Desvios de custo se originam na composicao do servico."
                </p>
              </div>
            </CardContent>
          </Card>

          {/* BLOCO 4 - ANALISE DE DESVIOS DO SERVICO */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-destructive" />
                Analise de Desvios do Servico
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="text-left p-3 font-medium text-muted-foreground">Tipo</th>
                      <th className="text-left p-3 font-medium text-muted-foreground">Descricao</th>
                      <th className="text-right p-3 font-medium text-muted-foreground">Impacto</th>
                      <th className="text-center p-3 font-medium text-muted-foreground">Situacao</th>
                    </tr>
                  </thead>
                  <tbody>
                    {desviosServico.map((desvio) => (
                      <tr
                        key={desvio.id}
                        className="border-b border-border hover:bg-muted/20 transition-colors cursor-pointer"
                        onClick={() => setDesvioSelecionado(desvio)}
                      >
                        <td className="p-3 font-medium text-foreground">{desvio.tipo}</td>
                        <td className="p-3 text-muted-foreground text-xs">{desvio.descricao}</td>
                        <td className="p-3 text-right text-destructive font-medium">
                          {formatCurrency(desvio.impacto)}
                        </td>
                        <td className="p-3 text-center">{getSituacaoBadge(desvio.situacao)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 border-t border-border">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-primary/30 hover:bg-primary/10 text-primary bg-transparent"
                >
                  <ClipboardList className="w-4 h-4 mr-2" />
                  Registrar analise do desvio
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* BLOCO FINAL - GOVERNANCA */}
        <Card className="bg-card border-border">
          <CardContent className="p-4 space-y-4">
            {/* Avisos visuais */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-destructive/5 rounded-lg border border-destructive/20">
                <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0" />
                <p className="text-sm text-foreground">Este servico impacta diretamente a meta economica</p>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg border border-border">
                <History className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                <p className="text-sm text-muted-foreground">Desvios recorrentes podem gerar mudanca de estrategia</p>
              </div>
            </div>

            {/* Botao de navegacao */}
            <div className="flex justify-start">
              <Button
                variant="outline"
                className="border-border hover:bg-muted hover:border-primary/30 bg-transparent"
                onClick={() => (window.location.href = "/obra/comercial/custo-meta")}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Voltar para Visao Geral de Custo & Meta
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
              <div>
                <h3 className="font-semibold text-foreground">Detalhe do Desvio</h3>
                <p className="text-sm text-muted-foreground">Analise detalhada</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setDesvioSelecionado(null)}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="p-4 space-y-4">
              {/* Tipo e Situacao */}
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="border-primary/30 bg-primary/5 text-primary">
                  {desvioSelecionado.tipo}
                </Badge>
                {getSituacaoBadge(desvioSelecionado.situacao)}
              </div>

              {/* Descricao */}
              <div>
                <p className="text-xs text-muted-foreground mb-1">Descricao</p>
                <p className="text-sm text-foreground">{desvioSelecionado.descricao}</p>
              </div>

              {/* Impacto */}
              <div className="p-3 bg-destructive/5 rounded-lg border border-destructive/20">
                <p className="text-xs text-muted-foreground mb-1">Impacto Economico</p>
                <p className="text-xl font-bold text-destructive">{formatCurrency(desvioSelecionado.impacto)}</p>
              </div>

              {/* Justificativa */}
              <div>
                <p className="text-xs text-muted-foreground mb-1">Justificativa</p>
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="text-sm text-muted-foreground italic">
                    {desvioSelecionado.situacao === "justificado"
                      ? "Desvio justificado pelo reajuste contratual da usina de asfalto, conforme Termo Aditivo TA-003."
                      : "Pendente de justificativa formal."}
                  </p>
                </div>
              </div>

              {/* Evidencias */}
              <div>
                <p className="text-xs text-muted-foreground mb-2">Evidencias</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-2 bg-muted/30 rounded-lg text-sm">
                    <FileText className="w-4 h-4 text-primary" />
                    <span className="text-foreground">Nota Fiscal - Usina CBUQ.pdf</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-muted/30 rounded-lg text-sm">
                    <FileText className="w-4 h-4 text-primary" />
                    <span className="text-foreground">Relatorio de Consumo.xlsx</span>
                  </div>
                </div>
              </div>

              {/* Acoes */}
              <div className="pt-4 space-y-2">
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Validar Analise
                </Button>
                <Button variant="outline" className="w-full border-border hover:bg-muted bg-transparent">
                  <ClipboardList className="w-4 h-4 mr-2" />
                  Solicitar Revisao
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
