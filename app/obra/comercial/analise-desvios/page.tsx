"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import {
  AlertTriangle,
  TrendingUp,
  Target,
  FileText,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle,
  Filter,
  BarChart3,
  Layers,
  AlertCircle,
} from "lucide-react"

// Dados mockados
const desviosData = [
  {
    id: "DV-001",
    servico: "Pavimentacao - CBUQ",
    tipo: "Produtividade",
    natureza: "custo",
    impactoValor: 450000,
    impactoPercentual: 5.6,
    origem: "Producao",
    causa: "Atraso na entrega de insumos",
    status: "em_analise",
    dataIdentificacao: "2025-01-10",
    responsavel: "Eng. Carlos Silva",
    acaoCorretiva: "Negociacao com fornecedor alternativo",
    prazoAcao: "2025-01-20",
    evidencias: ["Relatorio de producao", "Nota fiscal atrasada"],
    historico: [
      { data: "2025-01-10", acao: "Desvio identificado", usuario: "Sistema" },
      { data: "2025-01-11", acao: "Atribuido para analise", usuario: "Gerente de Projeto" },
      { data: "2025-01-12", acao: "Causa raiz identificada", usuario: "Eng. Carlos Silva" },
    ],
  },
  {
    id: "DV-002",
    servico: "Indireto - Manutencao",
    tipo: "Escopo",
    natureza: "custo",
    impactoValor: 590000,
    impactoPercentual: 10.77,
    origem: "Contrato",
    causa: "Aumento de escopo nao previsto",
    status: "pendente",
    dataIdentificacao: "2025-01-08",
    responsavel: "Eng. Maria Santos",
    acaoCorretiva: "Formalizar aditivo contratual",
    prazoAcao: "2025-01-25",
    evidencias: ["Solicitacao do cliente", "Analise de impacto"],
    historico: [
      { data: "2025-01-08", acao: "Desvio identificado", usuario: "Sistema" },
      { data: "2025-01-09", acao: "Classificado como escopo", usuario: "Comercial" },
    ],
  },
  {
    id: "DV-003",
    servico: "OAE - Pontes",
    tipo: "Preco",
    natureza: "custo",
    impactoValor: 300000,
    impactoPercentual: 3.06,
    origem: "Suprimentos",
    causa: "Reajuste de aco acima do previsto",
    status: "em_tratamento",
    dataIdentificacao: "2025-01-05",
    responsavel: "Coord. Suprimentos",
    acaoCorretiva: "Pleito de reequilibrio contratual",
    prazoAcao: "2025-01-30",
    evidencias: ["Cotacoes", "Indice de reajuste"],
    historico: [
      { data: "2025-01-05", acao: "Desvio identificado", usuario: "Sistema" },
      { data: "2025-01-06", acao: "Pleito iniciado", usuario: "Comercial" },
      { data: "2025-01-10", acao: "Documentacao enviada ao cliente", usuario: "Gerente de Contrato" },
    ],
  },
  {
    id: "DV-004",
    servico: "Terraplanagem",
    tipo: "Quantidade",
    natureza: "custo",
    impactoValor: 250000,
    impactoPercentual: 2.94,
    origem: "Projeto",
    causa: "Volume de corte maior que projetado",
    status: "resolvido",
    dataIdentificacao: "2024-12-20",
    responsavel: "Eng. Pedro Lima",
    acaoCorretiva: "Medicao extra aprovada pelo cliente",
    prazoAcao: "2025-01-10",
    evidencias: ["Levantamento topografico", "Aprovacao cliente"],
    historico: [
      { data: "2024-12-20", acao: "Desvio identificado", usuario: "Sistema" },
      { data: "2024-12-22", acao: "Analise tecnica concluida", usuario: "Engenharia" },
      { data: "2025-01-05", acao: "Aprovado pelo cliente", usuario: "Comercial" },
      { data: "2025-01-10", acao: "Desvio encerrado", usuario: "Gerente de Contrato" },
    ],
  },
  {
    id: "DV-005",
    servico: "Drenagem",
    tipo: "Produtividade",
    natureza: "economia",
    impactoValor: -220000,
    impactoPercentual: -3.55,
    origem: "Producao",
    causa: "Otimizacao de processo",
    status: "resolvido",
    dataIdentificacao: "2025-01-02",
    responsavel: "Eng. Ana Costa",
    acaoCorretiva: "Documentar boa pratica",
    prazoAcao: "2025-01-15",
    evidencias: ["Relatorio de melhoria"],
    historico: [
      { data: "2025-01-02", acao: "Economia identificada", usuario: "Sistema" },
      { data: "2025-01-05", acao: "Processo documentado", usuario: "Engenharia" },
    ],
  },
]

const resumoDesvios = {
  totalDesvios: 12,
  desviosCusto: 8,
  desviosEconomia: 4,
  impactoTotalCusto: 1570000,
  impactoTotalEconomia: -480000,
  impactoLiquido: 1090000,
  emAnalise: 3,
  pendentes: 2,
  emTratamento: 4,
  resolvidos: 3,
}

export default function AnaliseDesviosPage() {
  const [competencia, setCompetencia] = useState("2025-01")
  const [filtroTipo, setFiltroTipo] = useState("todos")
  const [filtroStatus, setFiltroStatus] = useState("todos")
  const [filtroNatureza, setFiltroNatureza] = useState("todos")
  const [desvioSelecionado, setDesvioSelecionado] = useState<(typeof desviosData)[0] | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<
      string,
      { label: string; variant: "default" | "secondary" | "outline" | "destructive" }
    > = {
      em_analise: { label: "Em Analise", variant: "secondary" },
      pendente: { label: "Pendente", variant: "outline" },
      em_tratamento: { label: "Em Tratamento", variant: "default" },
      resolvido: { label: "Resolvido", variant: "secondary" },
    }
    const config = statusConfig[status] || { label: status, variant: "outline" }
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  const getTipoBadge = (tipo: string) => {
    return (
      <Badge variant="outline" className="border-primary/30 text-primary">
        {tipo}
      </Badge>
    )
  }

  const handleAnalise = (desvio: (typeof desviosData)[0]) => {
    setDesvioSelecionado(desvio)
    setSheetOpen(true)
  }

  const desviosFiltrados = desviosData.filter((d) => {
    if (filtroTipo !== "todos" && d.tipo.toLowerCase() !== filtroTipo) return false
    if (filtroStatus !== "todos" && d.status !== filtroStatus) return false
    if (filtroNatureza !== "todos" && d.natureza !== filtroNatureza) return false
    return true
  })

  return (
    <div className="flex-1 overflow-auto p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-foreground">Analise de Desvios</h1>
            <Badge variant="outline" className="text-xs">
              CM-04
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm">Diagnostico e tratamento de desvios economicos</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={competencia} onValueChange={setCompetencia}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2025-01">Janeiro 2025</SelectItem>
              <SelectItem value="2024-12">Dezembro 2024</SelectItem>
              <SelectItem value="2024-11">Novembro 2024</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <FileText className="w-4 h-4 mr-1" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Bloco 1 - Resumo de Desvios */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <Card className="border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Total Desvios</span>
              <Layers className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-2xl font-bold text-foreground mt-1">{resumoDesvios.totalDesvios}</p>
            <p className="text-xs text-muted-foreground">
              {resumoDesvios.desviosCusto} custo / {resumoDesvios.desviosEconomia} economia
            </p>
          </CardContent>
        </Card>

        <Card className="border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Impacto Custo</span>
              <ArrowUpRight className="w-4 h-4 text-destructive" />
            </div>
            <p className="text-2xl font-bold text-destructive mt-1">
              R$ {(resumoDesvios.impactoTotalCusto / 1000000).toFixed(2)}M
            </p>
            <p className="text-xs text-muted-foreground">{resumoDesvios.desviosCusto} desvios</p>
          </CardContent>
        </Card>

        <Card className="border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Economia</span>
              <ArrowDownRight className="w-4 h-4 text-primary" />
            </div>
            <p className="text-2xl font-bold text-primary mt-1">
              R$ {(Math.abs(resumoDesvios.impactoTotalEconomia) / 1000).toFixed(0)}k
            </p>
            <p className="text-xs text-muted-foreground">{resumoDesvios.desviosEconomia} desvios</p>
          </CardContent>
        </Card>

        <Card className="border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Impacto Liquido</span>
              <BarChart3 className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-2xl font-bold text-foreground mt-1">
              R$ {(resumoDesvios.impactoLiquido / 1000000).toFixed(2)}M
            </p>
            <p className="text-xs text-muted-foreground">custo - economia</p>
          </CardContent>
        </Card>

        <Card className="border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Em Tratamento</span>
              <Clock className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-2xl font-bold text-foreground mt-1">
              {resumoDesvios.emAnalise + resumoDesvios.pendentes + resumoDesvios.emTratamento}
            </p>
            <p className="text-xs text-muted-foreground">aguardando acao</p>
          </CardContent>
        </Card>

        <Card className="border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Resolvidos</span>
              <CheckCircle className="w-4 h-4 text-primary" />
            </div>
            <p className="text-2xl font-bold text-primary mt-1">{resumoDesvios.resolvidos}</p>
            <p className="text-xs text-muted-foreground">no periodo</p>
          </CardContent>
        </Card>
      </div>

      {/* Bloco 2 - Filtros */}
      <Card className="border bg-card">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filtros:</span>
            </div>
            <Select value={filtroTipo} onValueChange={setFiltroTipo}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Tipos</SelectItem>
                <SelectItem value="produtividade">Produtividade</SelectItem>
                <SelectItem value="escopo">Escopo</SelectItem>
                <SelectItem value="preco">Preco</SelectItem>
                <SelectItem value="quantidade">Quantidade</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filtroStatus} onValueChange={setFiltroStatus}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos Status</SelectItem>
                <SelectItem value="em_analise">Em Analise</SelectItem>
                <SelectItem value="pendente">Pendente</SelectItem>
                <SelectItem value="em_tratamento">Em Tratamento</SelectItem>
                <SelectItem value="resolvido">Resolvido</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filtroNatureza} onValueChange={setFiltroNatureza}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Natureza" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todas</SelectItem>
                <SelectItem value="custo">Custo</SelectItem>
                <SelectItem value="economia">Economia</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Bloco 3 - Lista de Desvios */}
      <Card className="border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-primary" />
            Lista de Desvios
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="text-left p-3 font-medium text-muted-foreground">ID</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Servico</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Tipo</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Origem</th>
                  <th className="text-right p-3 font-medium text-muted-foreground">Impacto</th>
                  <th className="text-right p-3 font-medium text-muted-foreground">%</th>
                  <th className="text-center p-3 font-medium text-muted-foreground">Status</th>
                  <th className="text-center p-3 font-medium text-muted-foreground">Acao</th>
                </tr>
              </thead>
              <tbody>
                {desviosFiltrados.map((desvio) => (
                  <tr key={desvio.id} className="border-b hover:bg-muted/20 transition-colors">
                    <td className="p-3 font-mono text-xs">{desvio.id}</td>
                    <td className="p-3 font-medium">{desvio.servico}</td>
                    <td className="p-3">{getTipoBadge(desvio.tipo)}</td>
                    <td className="p-3 text-muted-foreground">{desvio.origem}</td>
                    <td
                      className={`p-3 text-right font-medium ${desvio.impactoValor > 0 ? "text-destructive" : "text-primary"}`}
                    >
                      {desvio.impactoValor > 0 ? "+" : ""}R$ {(desvio.impactoValor / 1000).toFixed(0)}k
                    </td>
                    <td
                      className={`p-3 text-right ${desvio.impactoPercentual > 0 ? "text-destructive" : "text-primary"}`}
                    >
                      {desvio.impactoPercentual > 0 ? "+" : ""}
                      {desvio.impactoPercentual.toFixed(2)}%
                    </td>
                    <td className="p-3 text-center">{getStatusBadge(desvio.status)}</td>
                    <td className="p-3 text-center">
                      <Button variant="ghost" size="sm" onClick={() => handleAnalise(desvio)}>
                        Analisar
                        <ChevronRight className="w-3 h-3 ml-1" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Bloco 4 - Analise por Tipo */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Desvios por Tipo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { tipo: "Produtividade", qtd: 4, valor: 670000 },
              { tipo: "Escopo", qtd: 3, valor: 590000 },
              { tipo: "Preco", qtd: 3, valor: 300000 },
              { tipo: "Quantidade", qtd: 2, valor: 250000 },
            ].map((item) => (
              <div key={item.tipo} className="flex items-center justify-between p-2 rounded bg-muted/30">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="font-medium">{item.tipo}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-muted-foreground">{item.qtd} desvios</span>
                  <span className="font-medium">R$ {(item.valor / 1000).toFixed(0)}k</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Desvios por Origem</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { origem: "Producao", qtd: 5, valor: 890000 },
              { origem: "Suprimentos", qtd: 3, valor: 420000 },
              { origem: "Contrato", qtd: 2, valor: 590000 },
              { origem: "Projeto", qtd: 2, valor: 250000 },
            ].map((item) => (
              <div key={item.origem} className="flex items-center justify-between p-2 rounded bg-muted/30">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary/70" />
                  <span className="font-medium">{item.origem}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-muted-foreground">{item.qtd} desvios</span>
                  <span className="font-medium">R$ {(item.valor / 1000).toFixed(0)}k</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Bloco 5 - Governanca */}
      <Card className="border bg-card">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Desvio nao tratado e resultado nao gerenciado.</p>
                <p className="text-sm text-muted-foreground">
                  Cada desvio deve ter causa, responsavel e acao corretiva definidos.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <TrendingUp className="w-4 h-4 mr-1" />
                CM-01 Visao Geral
              </Button>
              <Button variant="outline" size="sm">
                <Target className="w-4 h-4 mr-1" />
                CM-03 Metas
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sheet - Detalhe do Desvio */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          {desvioSelecionado && (
            <>
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-primary" />
                  Analise de Desvio
                </SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                {/* Identificacao */}
                <div className="space-y-3">
                  <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Identificacao</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded bg-muted/30">
                      <p className="text-xs text-muted-foreground">ID</p>
                      <p className="font-mono font-medium">{desvioSelecionado.id}</p>
                    </div>
                    <div className="p-3 rounded bg-muted/30">
                      <p className="text-xs text-muted-foreground">Data</p>
                      <p className="font-medium">{desvioSelecionado.dataIdentificacao}</p>
                    </div>
                  </div>
                  <div className="p-3 rounded bg-muted/30">
                    <p className="text-xs text-muted-foreground">Servico</p>
                    <p className="font-medium">{desvioSelecionado.servico}</p>
                  </div>
                </div>

                {/* Classificacao */}
                <div className="space-y-3">
                  <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Classificacao</h4>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 rounded bg-muted/30">
                      <p className="text-xs text-muted-foreground">Tipo</p>
                      <p className="font-medium">{desvioSelecionado.tipo}</p>
                    </div>
                    <div className="p-3 rounded bg-muted/30">
                      <p className="text-xs text-muted-foreground">Origem</p>
                      <p className="font-medium">{desvioSelecionado.origem}</p>
                    </div>
                    <div className="p-3 rounded bg-muted/30">
                      <p className="text-xs text-muted-foreground">Status</p>
                      {getStatusBadge(desvioSelecionado.status)}
                    </div>
                  </div>
                </div>

                {/* Impacto */}
                <div className="space-y-3">
                  <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                    Impacto Economico
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div
                      className={`p-3 rounded ${desvioSelecionado.impactoValor > 0 ? "bg-destructive/10" : "bg-primary/10"}`}
                    >
                      <p className="text-xs text-muted-foreground">Valor</p>
                      <p
                        className={`text-xl font-bold ${desvioSelecionado.impactoValor > 0 ? "text-destructive" : "text-primary"}`}
                      >
                        {desvioSelecionado.impactoValor > 0 ? "+" : ""}R${" "}
                        {(desvioSelecionado.impactoValor / 1000).toFixed(0)}k
                      </p>
                    </div>
                    <div
                      className={`p-3 rounded ${desvioSelecionado.impactoPercentual > 0 ? "bg-destructive/10" : "bg-primary/10"}`}
                    >
                      <p className="text-xs text-muted-foreground">Percentual</p>
                      <p
                        className={`text-xl font-bold ${desvioSelecionado.impactoPercentual > 0 ? "text-destructive" : "text-primary"}`}
                      >
                        {desvioSelecionado.impactoPercentual > 0 ? "+" : ""}
                        {desvioSelecionado.impactoPercentual.toFixed(2)}%
                      </p>
                    </div>
                  </div>
                </div>

                {/* Causa e Acao */}
                <div className="space-y-3">
                  <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                    Causa e Tratamento
                  </h4>
                  <div className="p-3 rounded bg-muted/30">
                    <p className="text-xs text-muted-foreground">Causa Raiz</p>
                    <p className="font-medium">{desvioSelecionado.causa}</p>
                  </div>
                  <div className="p-3 rounded bg-muted/30">
                    <p className="text-xs text-muted-foreground">Acao Corretiva</p>
                    <p className="font-medium">{desvioSelecionado.acaoCorretiva}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded bg-muted/30">
                      <p className="text-xs text-muted-foreground">Responsavel</p>
                      <p className="font-medium">{desvioSelecionado.responsavel}</p>
                    </div>
                    <div className="p-3 rounded bg-muted/30">
                      <p className="text-xs text-muted-foreground">Prazo</p>
                      <p className="font-medium">{desvioSelecionado.prazoAcao}</p>
                    </div>
                  </div>
                </div>

                {/* Evidencias */}
                <div className="space-y-3">
                  <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Evidencias</h4>
                  <div className="space-y-2">
                    {desvioSelecionado.evidencias.map((ev, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2 rounded bg-muted/30">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{ev}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Historico */}
                <div className="space-y-3">
                  <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Historico</h4>
                  <div className="space-y-2">
                    {desvioSelecionado.historico.map((h, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-2">
                        <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                        <div>
                          <p className="text-sm font-medium">{h.acao}</p>
                          <p className="text-xs text-muted-foreground">
                            {h.data} - {h.usuario}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Acoes */}
                <div className="flex gap-2 pt-4 border-t">
                  <Button className="flex-1">Atualizar Status</Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    Adicionar Acao
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
