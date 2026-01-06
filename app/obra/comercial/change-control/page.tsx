"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layout/app-layout"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  FileText,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Send,
  Plus,
  X,
  MessageSquare,
  Paperclip,
} from "lucide-react"

// Dados mockados
const mudancasMock = [
  {
    id: "SME-001",
    tipo: "SME",
    origem: "Producao",
    descricao: "Adicao de servico de contencao nao previsto em projeto",
    impactoCusto: 185000,
    impactoReceita: 220000,
    impactoPrazo: 15,
    status: "aprovado",
    competencia: "2025-12",
    dataRegistro: "2025-12-05",
    justificativa:
      "Necessidade identificada durante execucao de terraplenagem. Solo apresentou condicoes diferentes do previsto no projeto basico.",
    evidencias: ["Relatorio Geologico", "Fotos de Campo", "ART Complementar"],
    historico: [
      { data: "2025-12-05", acao: "Registrado pela Producao", usuario: "Joao Silva" },
      { data: "2025-12-08", acao: "Enviado para Cliente", usuario: "Maria Santos" },
      { data: "2025-12-15", acao: "Aprovado pelo Cliente", usuario: "Cliente - DNIT" },
    ],
    refletidoMedicao: true,
    refletidoFaturamento: true,
  },
  {
    id: "ADT-002",
    tipo: "Aditivo",
    origem: "Contrato",
    descricao: "Aditivo de prazo - extensao de 60 dias por condicoes climaticas",
    impactoCusto: 0,
    impactoReceita: 0,
    impactoPrazo: 60,
    status: "aprovado",
    competencia: "2025-11",
    dataRegistro: "2025-11-20",
    justificativa:
      "Periodo chuvoso acima da media historica impossibilitou execucao de servicos de terraplenagem conforme previsto no cronograma.",
    evidencias: ["Dados Meteorologicos INMET", "Diario de Obra", "Oficio ao Cliente"],
    historico: [
      { data: "2025-11-20", acao: "Registrado pela Engenharia", usuario: "Carlos Eng" },
      { data: "2025-11-22", acao: "Enviado para Cliente", usuario: "Maria Santos" },
      { data: "2025-11-30", acao: "Aprovado pelo Cliente", usuario: "Cliente - DNIT" },
    ],
    refletidoMedicao: false,
    refletidoFaturamento: false,
  },
  {
    id: "PLT-003",
    tipo: "Pleito",
    origem: "Suprimentos",
    descricao: "Reequilibrio economico por variacao de preco de CBUQ",
    impactoCusto: 320000,
    impactoReceita: 380000,
    impactoPrazo: 0,
    status: "em_negociacao",
    competencia: "2025-12",
    dataRegistro: "2025-12-10",
    justificativa:
      "Variacao acumulada de 18% no preco do CBUQ nos ultimos 6 meses, conforme indices de reajuste contratual (SINAPI/FGV).",
    evidencias: ["Tabela SINAPI", "Notas Fiscais Fornecedores", "Memoria de Calculo"],
    historico: [
      { data: "2025-12-10", acao: "Registrado por Suprimentos", usuario: "Ana Costa" },
      { data: "2025-12-12", acao: "Enviado para Cliente", usuario: "Maria Santos" },
      { data: "2025-12-18", acao: "Em analise pelo Cliente", usuario: "Cliente - DNIT" },
    ],
    refletidoMedicao: false,
    refletidoFaturamento: false,
  },
  {
    id: "SME-004",
    tipo: "SME",
    origem: "Cliente",
    descricao: "Inclusao de acesso provisorio para comunidade local",
    impactoCusto: 95000,
    impactoReceita: 120000,
    impactoPrazo: 10,
    status: "em_analise",
    competencia: "2025-12",
    dataRegistro: "2025-12-18",
    justificativa: "Solicitacao do DNIT para atender demanda de comunidade ribeirinha durante periodo de obras.",
    evidencias: ["Oficio DNIT", "Croqui de Locacao", "Orcamento Estimativo"],
    historico: [{ data: "2025-12-18", acao: "Registrado - Solicitacao Cliente", usuario: "Maria Santos" }],
    refletidoMedicao: false,
    refletidoFaturamento: false,
  },
  {
    id: "PLT-005",
    tipo: "Pleito",
    origem: "Producao",
    descricao: "Ressarcimento por paralisacao nao programada",
    impactoCusto: 0,
    impactoReceita: 150000,
    impactoPrazo: 0,
    status: "rejeitado",
    competencia: "2025-10",
    dataRegistro: "2025-10-25",
    justificativa: "Paralisacao de 5 dias por bloqueio de acesso na rodovia por manifestacao.",
    evidencias: ["BO Policia Rodoviaria", "Fotos", "Diario de Obra"],
    historico: [
      { data: "2025-10-25", acao: "Registrado pela Producao", usuario: "Joao Silva" },
      { data: "2025-10-28", acao: "Enviado para Cliente", usuario: "Maria Santos" },
      { data: "2025-11-05", acao: "Rejeitado pelo Cliente", usuario: "Cliente - DNIT" },
    ],
    refletidoMedicao: false,
    refletidoFaturamento: false,
  },
  {
    id: "ADT-006",
    tipo: "Aditivo",
    origem: "Contrato",
    descricao: "Aditivo de valor - acrescimo de 8% no escopo de drenagem",
    impactoCusto: 420000,
    impactoReceita: 520000,
    impactoPrazo: 30,
    status: "enviado",
    competencia: "2025-12",
    dataRegistro: "2025-12-20",
    justificativa: "Necessidade de ampliacao do sistema de drenagem conforme revisao de projeto aprovada.",
    evidencias: ["Projeto Revisado", "Planilha Orcamentaria", "Parecer Tecnico"],
    historico: [
      { data: "2025-12-20", acao: "Registrado pela Engenharia", usuario: "Carlos Eng" },
      { data: "2025-12-21", acao: "Enviado para Cliente", usuario: "Maria Santos" },
    ],
    refletidoMedicao: false,
    refletidoFaturamento: false,
  },
]

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value)
}

const getStatusConfig = (status: string) => {
  switch (status) {
    case "aprovado":
      return { label: "Aprovado", color: "bg-primary/20 text-primary", icon: CheckCircle }
    case "rejeitado":
      return { label: "Rejeitado", color: "bg-destructive/20 text-destructive", icon: XCircle }
    case "em_negociacao":
      return { label: "Em Negociacao", color: "bg-accent text-accent-foreground", icon: MessageSquare }
    case "em_analise":
      return { label: "Em Analise", color: "bg-muted text-muted-foreground", icon: Clock }
    case "enviado":
      return { label: "Enviado", color: "bg-secondary text-secondary-foreground", icon: Send }
    default:
      return { label: status, color: "bg-muted text-muted-foreground", icon: Clock }
  }
}

const getTipoConfig = (tipo: string) => {
  switch (tipo) {
    case "SME":
      return { label: "SME", color: "bg-muted text-foreground" }
    case "Aditivo":
      return { label: "Aditivo", color: "bg-primary/20 text-primary" }
    case "Pleito":
      return { label: "Pleito", color: "bg-accent text-accent-foreground" }
    default:
      return { label: tipo, color: "bg-muted text-muted-foreground" }
  }
}

export default function ChangeControlPage() {
  const [competencia, setCompetencia] = useState("2025-12")
  const [filtroTipo, setFiltroTipo] = useState("todos")
  const [mudancaSelecionada, setMudancaSelecionada] = useState<(typeof mudancasMock)[0] | null>(null)

  const mudancasFiltradas = filtroTipo === "todos" ? mudancasMock : mudancasMock.filter((m) => m.tipo === filtroTipo)

  // Calcular resumo
  const resumo = {
    total: mudancasMock.length,
    impactoFinanceiro: mudancasMock.reduce((acc, m) => acc + m.impactoReceita - m.impactoCusto, 0),
    impactoPrazo: mudancasMock.reduce((acc, m) => acc + m.impactoPrazo, 0),
    aprovadas: mudancasMock.filter((m) => m.status === "aprovado").length,
    emNegociacao: mudancasMock.filter((m) => m.status === "em_negociacao").length,
    rejeitadas: mudancasMock.filter((m) => m.status === "rejeitado").length,
  }

  // Relacao com medicao e faturamento
  const relacaoMedicao = {
    impactamMedicao: 3,
    refletidasMedicao: 2,
    pendentesFaturamento: 1,
  }

  return (
    <AppLayout>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex-shrink-0 border-b border-border bg-card px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-bold text-foreground">Change Control</h1>
                <Badge variant="outline" className="text-xs font-mono">
                  RM-05
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">SME, Aditivos e Pleitos</p>
            </div>
            <div className="flex items-center gap-3">
              <Select value={competencia} onValueChange={setCompetencia}>
                <SelectTrigger className="w-36 h-9 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2025-12">Dezembro/2025</SelectItem>
                  <SelectItem value="2025-11">Novembro/2025</SelectItem>
                  <SelectItem value="2025-10">Outubro/2025</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filtroTipo} onValueChange={setFiltroTipo}>
                <SelectTrigger className="w-32 h-9 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os Tipos</SelectItem>
                  <SelectItem value="SME">SME</SelectItem>
                  <SelectItem value="Aditivo">Aditivo</SelectItem>
                  <SelectItem value="Pleito">Pleito</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          <div className="flex h-full">
            {/* Main Content */}
            <div className={`flex-1 overflow-auto p-6 ${mudancaSelecionada ? "w-2/3" : "w-full"}`}>
              {/* Bloco 1 - Visao Consolidada */}
              <section className="mb-6">
                <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Visao Consolidada das Mudancas
                </h2>
                <div className="grid grid-cols-6 gap-3">
                  <button className="text-left p-3 bg-card border border-border rounded hover:border-primary/40 transition-colors">
                    <p className="text-xs text-muted-foreground uppercase">Total Registradas</p>
                    <p className="text-2xl font-bold text-foreground tabular-nums">{resumo.total}</p>
                  </button>
                  <button className="text-left p-3 bg-card border border-border rounded hover:border-primary/40 transition-colors">
                    <p className="text-xs text-muted-foreground uppercase">Impacto Financeiro</p>
                    <p
                      className={`text-xl font-bold tabular-nums ${resumo.impactoFinanceiro >= 0 ? "text-primary" : "text-destructive"}`}
                    >
                      {resumo.impactoFinanceiro >= 0 ? "+" : ""}
                      {formatCurrency(resumo.impactoFinanceiro)}
                    </p>
                  </button>
                  <button className="text-left p-3 bg-card border border-border rounded hover:border-primary/40 transition-colors">
                    <p className="text-xs text-muted-foreground uppercase">Impacto Prazo</p>
                    <p className="text-2xl font-bold text-foreground tabular-nums">+{resumo.impactoPrazo} dias</p>
                  </button>
                  <button className="text-left p-3 bg-card border border-border rounded hover:border-primary/40 transition-colors">
                    <p className="text-xs text-muted-foreground uppercase">Aprovadas</p>
                    <p className="text-2xl font-bold text-primary tabular-nums">{resumo.aprovadas}</p>
                  </button>
                  <button className="text-left p-3 bg-card border border-border rounded hover:border-primary/40 transition-colors">
                    <p className="text-xs text-muted-foreground uppercase">Em Negociacao</p>
                    <p className="text-2xl font-bold text-accent-foreground tabular-nums">{resumo.emNegociacao}</p>
                  </button>
                  <button className="text-left p-3 bg-card border border-border rounded hover:border-primary/40 transition-colors">
                    <p className="text-xs text-muted-foreground uppercase">Rejeitadas</p>
                    <p className="text-2xl font-bold text-destructive tabular-nums">{resumo.rejeitadas}</p>
                  </button>
                </div>
              </section>

              {/* Bloco 2 - Lista de Mudancas */}
              <section className="mb-6">
                <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Lista de Mudancas
                </h2>
                <div className="border border-border rounded overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/50">
                      <tr className="text-left text-xs text-muted-foreground uppercase">
                        <th className="px-3 py-2 font-medium">ID</th>
                        <th className="px-3 py-2 font-medium">Tipo</th>
                        <th className="px-3 py-2 font-medium">Origem</th>
                        <th className="px-3 py-2 font-medium">Descricao</th>
                        <th className="px-3 py-2 font-medium text-right">Custo</th>
                        <th className="px-3 py-2 font-medium text-right">Receita</th>
                        <th className="px-3 py-2 font-medium text-center">Prazo</th>
                        <th className="px-3 py-2 font-medium text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {mudancasFiltradas.map((mudanca) => {
                        const statusConfig = getStatusConfig(mudanca.status)
                        const tipoConfig = getTipoConfig(mudanca.tipo)
                        const StatusIcon = statusConfig.icon

                        return (
                          <tr
                            key={mudanca.id}
                            onClick={() => setMudancaSelecionada(mudanca)}
                            className={`hover:bg-muted/30 cursor-pointer transition-colors ${
                              mudancaSelecionada?.id === mudanca.id ? "bg-primary/5" : ""
                            }`}
                          >
                            <td className="px-3 py-2 font-mono text-xs font-medium">{mudanca.id}</td>
                            <td className="px-3 py-2">
                              <Badge className={`text-xs ${tipoConfig.color}`}>{tipoConfig.label}</Badge>
                            </td>
                            <td className="px-3 py-2 text-muted-foreground">{mudanca.origem}</td>
                            <td className="px-3 py-2 max-w-xs truncate">{mudanca.descricao}</td>
                            <td className="px-3 py-2 text-right tabular-nums text-muted-foreground">
                              {mudanca.impactoCusto > 0 ? formatCurrency(mudanca.impactoCusto) : "-"}
                            </td>
                            <td className="px-3 py-2 text-right tabular-nums text-primary">
                              {mudanca.impactoReceita > 0 ? formatCurrency(mudanca.impactoReceita) : "-"}
                            </td>
                            <td className="px-3 py-2 text-center tabular-nums">
                              {mudanca.impactoPrazo > 0 ? `+${mudanca.impactoPrazo}d` : "-"}
                            </td>
                            <td className="px-3 py-2">
                              <div className="flex items-center justify-center gap-1">
                                <StatusIcon className="w-3 h-3" />
                                <Badge className={`text-xs ${statusConfig.color}`}>{statusConfig.label}</Badge>
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Bloco 4 - Relacao com Medicao e Faturamento */}
              <section className="mb-6">
                <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Relacao com Medicao e Faturamento
                </h2>
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 bg-card border border-border rounded">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground uppercase">Impactam Medicao</p>
                    </div>
                    <p className="text-xl font-bold text-foreground tabular-nums">{relacaoMedicao.impactamMedicao}</p>
                    <p className="text-xs text-muted-foreground mt-1">mudancas aprovadas com valor</p>
                  </div>
                  <div className="p-3 bg-card border border-border rounded">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <p className="text-xs text-muted-foreground uppercase">Refletidas na Medicao</p>
                    </div>
                    <p className="text-xl font-bold text-primary tabular-nums">{relacaoMedicao.refletidasMedicao}</p>
                    <p className="text-xs text-muted-foreground mt-1">ja incluidas na medicao cliente</p>
                  </div>
                  <div className="p-3 bg-card border border-border rounded">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-4 h-4 text-accent-foreground" />
                      <p className="text-xs text-muted-foreground uppercase">Pendentes Faturamento</p>
                    </div>
                    <p className="text-xl font-bold text-accent-foreground tabular-nums">
                      {relacaoMedicao.pendentesFaturamento}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">aprovadas mas nao faturadas</p>
                  </div>
                </div>
                <div className="mt-3 p-3 bg-muted/50 border border-border rounded">
                  <p className="text-xs text-muted-foreground">
                    Mudancas aprovadas devem refletir automaticamente na medicao e no faturamento.
                  </p>
                </div>
              </section>

              {/* Bloco 5 - Governanca */}
              <section>
                <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Governanca da Mudanca
                </h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Registrar Nova Mudanca
                  </Button>
                  <Button variant="outline" size="sm">
                    <Send className="w-4 h-4 mr-2" />
                    Enviar para Cliente
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Registrar Decisao do Cliente
                  </Button>
                  <Button variant="outline" size="sm">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Encerrar Mudanca
                  </Button>
                </div>

                <div className="space-y-2">
                  <div className="p-3 bg-destructive/10 border border-destructive/20 rounded">
                    <p className="text-xs text-destructive">
                      Mudancas nao formalizadas geram risco economico para o contrato.
                    </p>
                  </div>
                  <div className="p-3 bg-muted/50 border border-border rounded">
                    <p className="text-xs text-muted-foreground">
                      Mudancas rejeitadas devem ser tratadas como perda ou licao aprendida.
                    </p>
                  </div>
                </div>
              </section>
            </div>

            {/* Painel Lateral - Detalhe da Mudanca */}
            {mudancaSelecionada && (
              <div className="w-1/3 border-l border-border bg-card overflow-hidden flex flex-col">
                <div className="flex-shrink-0 px-4 py-3 border-b border-border flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold">{mudancaSelecionada.id}</span>
                    <Badge className={getTipoConfig(mudancaSelecionada.tipo).color}>{mudancaSelecionada.tipo}</Badge>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setMudancaSelecionada(null)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <ScrollArea className="flex-1">
                  <div className="p-4 space-y-4">
                    {/* Status */}
                    <div>
                      <p className="text-xs text-muted-foreground uppercase mb-1">Status</p>
                      <Badge className={`${getStatusConfig(mudancaSelecionada.status).color}`}>
                        {getStatusConfig(mudancaSelecionada.status).label}
                      </Badge>
                    </div>

                    {/* Descricao */}
                    <div>
                      <p className="text-xs text-muted-foreground uppercase mb-1">Descricao</p>
                      <p className="text-sm text-foreground">{mudancaSelecionada.descricao}</p>
                    </div>

                    {/* Justificativa */}
                    <div>
                      <p className="text-xs text-muted-foreground uppercase mb-1">Justificativa</p>
                      <p className="text-sm text-foreground">{mudancaSelecionada.justificativa}</p>
                    </div>

                    {/* Impactos */}
                    <div className="grid grid-cols-3 gap-2">
                      <div className="p-2 bg-muted/50 rounded">
                        <p className="text-xs text-muted-foreground">Custo</p>
                        <p className="text-sm font-bold tabular-nums">
                          {mudancaSelecionada.impactoCusto > 0 ? formatCurrency(mudancaSelecionada.impactoCusto) : "-"}
                        </p>
                      </div>
                      <div className="p-2 bg-muted/50 rounded">
                        <p className="text-xs text-muted-foreground">Receita</p>
                        <p className="text-sm font-bold tabular-nums text-primary">
                          {mudancaSelecionada.impactoReceita > 0
                            ? formatCurrency(mudancaSelecionada.impactoReceita)
                            : "-"}
                        </p>
                      </div>
                      <div className="p-2 bg-muted/50 rounded">
                        <p className="text-xs text-muted-foreground">Prazo</p>
                        <p className="text-sm font-bold tabular-nums">
                          {mudancaSelecionada.impactoPrazo > 0 ? `+${mudancaSelecionada.impactoPrazo}d` : "-"}
                        </p>
                      </div>
                    </div>

                    {/* Evidencias */}
                    <div>
                      <p className="text-xs text-muted-foreground uppercase mb-2">Evidencias</p>
                      <div className="space-y-1">
                        {mudancaSelecionada.evidencias.map((doc, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 p-2 bg-muted/30 rounded text-xs hover:bg-muted/50 cursor-pointer"
                          >
                            <Paperclip className="w-3 h-3 text-muted-foreground" />
                            <span>{doc}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Historico */}
                    <div>
                      <p className="text-xs text-muted-foreground uppercase mb-2">Historico</p>
                      <div className="space-y-2">
                        {mudancaSelecionada.historico.map((h, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs">
                            <div className="w-1.5 h-1.5 rounded-full bg-border mt-1.5 flex-shrink-0" />
                            <div>
                              <p className="font-medium">{h.acao}</p>
                              <p className="text-muted-foreground">
                                {h.usuario} - {h.data}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Situacao Medicao/Faturamento */}
                    <div>
                      <p className="text-xs text-muted-foreground uppercase mb-2">Situacao</p>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Refletido na Medicao</span>
                          <span className={mudancaSelecionada.refletidoMedicao ? "text-primary" : "text-destructive"}>
                            {mudancaSelecionada.refletidoMedicao ? "Sim" : "Nao"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Refletido no Faturamento</span>
                          <span
                            className={mudancaSelecionada.refletidoFaturamento ? "text-primary" : "text-destructive"}
                          >
                            {mudancaSelecionada.refletidoFaturamento ? "Sim" : "Nao"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
