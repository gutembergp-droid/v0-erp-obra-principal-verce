"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layout/app-layout"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Building2,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Circle,
  X,
  MessageSquare,
  Paperclip,
  History,
} from "lucide-react"
import { InfoTooltip } from "@/components/ui/info-tooltip"

type Origem = "corporativo" | "contrato" | "obra" | "auditoria" | "controle" | "comunicacao"
type Status = "pendente" | "em_andamento" | "concluido" | "atrasado"
type Prioridade = "alta" | "media" | "baixa"

interface AcaoGerencial {
  id: string
  titulo: string
  descricao: string
  origem: Origem
  status: Status
  prioridade: Prioridade
  responsavel: string
  prazo: string
  dataCriacao: string
  historico: { data: string; acao: string; usuario: string }[]
  anexos: number
  comentarios: number
}

const acoes: AcaoGerencial[] = [
  {
    id: "AG-001",
    titulo: "Aprovar BM-12 para faturamento",
    descricao: "Boletim de Medicao 12 aguardando aprovacao final do GC para envio ao cliente",
    origem: "contrato",
    status: "pendente",
    prioridade: "alta",
    responsavel: "Gerente Contrato",
    prazo: "06/01/2026",
    dataCriacao: "03/01/2026",
    historico: [
      { data: "03/01/2026", acao: "Criado pelo setor Comercial", usuario: "Ana Silva" },
      { data: "04/01/2026", acao: "Documentacao anexada", usuario: "Carlos Lima" },
    ],
    anexos: 3,
    comentarios: 2,
  },
  {
    id: "AG-002",
    titulo: "Reuniao de alinhamento com Cliente",
    descricao: "Reuniao mensal de acompanhamento com representantes do DNIT",
    origem: "corporativo",
    status: "em_andamento",
    prioridade: "alta",
    responsavel: "Gerente Contrato",
    prazo: "07/01/2026",
    dataCriacao: "02/01/2026",
    historico: [{ data: "02/01/2026", acao: "Agendada pela Diretoria", usuario: "Diretor Operacoes" }],
    anexos: 1,
    comentarios: 5,
  },
  {
    id: "AG-003",
    titulo: "Validar NC-2024-089 (Concreto)",
    descricao: "Nao conformidade em lote de concreto - aguardando parecer tecnico",
    origem: "auditoria",
    status: "atrasado",
    prioridade: "alta",
    responsavel: "Eng. Qualidade",
    prazo: "04/01/2026",
    dataCriacao: "28/12/2025",
    historico: [
      { data: "28/12/2025", acao: "NC registrada pela Qualidade", usuario: "Maria Santos" },
      { data: "02/01/2026", acao: "Solicitado laudo laboratorio", usuario: "Joao Pereira" },
    ],
    anexos: 4,
    comentarios: 8,
  },
  {
    id: "AG-004",
    titulo: "Liberar requisicao de pessoal",
    descricao: "Requisicao de 5 armadores para frente de servico OAE-03",
    origem: "obra",
    status: "pendente",
    prioridade: "media",
    responsavel: "Gerente Contrato",
    prazo: "08/01/2026",
    dataCriacao: "05/01/2026",
    historico: [{ data: "05/01/2026", acao: "Solicitado pelo Eng. Producao", usuario: "Pedro Costa" }],
    anexos: 1,
    comentarios: 0,
  },
  {
    id: "AG-005",
    titulo: "Revisar projecao de fluxo de caixa",
    descricao: "Atualizar projecao financeira para os proximos 3 meses",
    origem: "controle",
    status: "em_andamento",
    prioridade: "media",
    responsavel: "Controller",
    prazo: "10/01/2026",
    dataCriacao: "04/01/2026",
    historico: [{ data: "04/01/2026", acao: "Iniciada analise", usuario: "Fernanda Lima" }],
    anexos: 2,
    comentarios: 1,
  },
  {
    id: "AG-006",
    titulo: "Responder oficio DNIT 0234/2026",
    descricao: "Oficio solicitando esclarecimentos sobre cronograma de terraplenagem",
    origem: "comunicacao",
    status: "pendente",
    prioridade: "alta",
    responsavel: "Gerente Contrato",
    prazo: "09/01/2026",
    dataCriacao: "05/01/2026",
    historico: [{ data: "05/01/2026", acao: "Recebido e protocolado", usuario: "Secretaria" }],
    anexos: 1,
    comentarios: 0,
  },
  {
    id: "AG-007",
    titulo: "Aprovar pedido de compra PC-1247",
    descricao: "Pedido de compra de aco CA-50 - R$ 847.000,00",
    origem: "obra",
    status: "concluido",
    prioridade: "alta",
    responsavel: "Gerente Contrato",
    prazo: "05/01/2026",
    dataCriacao: "03/01/2026",
    historico: [
      { data: "03/01/2026", acao: "Criado por Suprimentos", usuario: "Lucas Oliveira" },
      { data: "04/01/2026", acao: "Cotacoes anexadas", usuario: "Lucas Oliveira" },
      { data: "05/01/2026", acao: "Aprovado pelo GC", usuario: "Gerente Contrato" },
    ],
    anexos: 5,
    comentarios: 3,
  },
]

const origemConfig: Record<Origem, { label: string; color: string; icon: typeof Building2 }> = {
  corporativo: {
    label: "Corporativo",
    color: "bg-purple-500/10 text-purple-600 border-purple-500/20",
    icon: Building2,
  },
  contrato: { label: "Contrato", color: "bg-blue-500/10 text-blue-600 border-blue-500/20", icon: FileText },
  obra: { label: "Obra", color: "bg-orange-500/10 text-orange-600 border-orange-500/20", icon: Building2 },
  auditoria: { label: "Auditoria", color: "bg-red-500/10 text-red-600 border-red-500/20", icon: AlertTriangle },
  controle: { label: "Controle", color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20", icon: FileText },
  comunicacao: { label: "Comunicacao", color: "bg-cyan-500/10 text-cyan-600 border-cyan-500/20", icon: MessageSquare },
}

const statusConfig: Record<Status, { label: string; color: string; icon: typeof Circle }> = {
  pendente: { label: "Pendente", color: "text-yellow-600", icon: Circle },
  em_andamento: { label: "Em Andamento", color: "text-blue-600", icon: Clock },
  concluido: { label: "Concluido", color: "text-green-600", icon: CheckCircle2 },
  atrasado: { label: "Atrasado", color: "text-red-600", icon: AlertTriangle },
}

const prioridadeConfig: Record<Prioridade, { label: string; color: string }> = {
  alta: { label: "Alta", color: "bg-red-500/10 text-red-600 border-red-500/30" },
  media: { label: "Media", color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/30" },
  baixa: { label: "Baixa", color: "bg-gray-500/10 text-gray-600 border-gray-500/30" },
}

const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"]

export default function AgendaGerencialPage() {
  const [selectedAcao, setSelectedAcao] = useState<AcaoGerencial | null>(null)
  const [visaoTemporal, setVisaoTemporal] = useState<"semana" | "mes">("semana")
  const [filtroOrigem, setFiltroOrigem] = useState<Origem | "todos">("todos")
  const [filtroStatus, setFiltroStatus] = useState<Status | "todos">("todos")

  const acoesFiltradas = acoes.filter((acao) => {
    if (filtroOrigem !== "todos" && acao.origem !== filtroOrigem) return false
    if (filtroStatus !== "todos" && acao.status !== filtroStatus) return false
    return true
  })

  const contadores = {
    pendente: acoes.filter((a) => a.status === "pendente").length,
    em_andamento: acoes.filter((a) => a.status === "em_andamento").length,
    atrasado: acoes.filter((a) => a.status === "atrasado").length,
    concluido: acoes.filter((a) => a.status === "concluido").length,
  }

  return (
    <AppLayout>
      <div className="flex flex-col h-[calc(100vh-80px)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border/50 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold text-foreground">Agenda Gerencial</h1>
              <Badge variant="outline" className="text-[10px] font-mono">
                GC-02
              </Badge>
              <InfoTooltip
                title="Agenda Gerencial de Governanca"
                description="Centraliza todas as acoes gerenciais pendentes: corporativas, contratuais, obra, auditoria, controle e comunicacoes."
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Navegacao temporal */}
            <div className="flex items-center gap-1 border border-border/50 rounded-lg p-1">
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium px-2 min-w-[140px] text-center">
                {visaoTemporal === "semana" ? "05 - 11 Jan 2026" : "Janeiro 2026"}
              </span>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            {/* Toggle semana/mes */}
            <div className="flex items-center border border-border/50 rounded-lg p-1">
              <Button
                variant={visaoTemporal === "semana" ? "secondary" : "ghost"}
                size="sm"
                className="h-7 text-xs"
                onClick={() => setVisaoTemporal("semana")}
              >
                Semana
              </Button>
              <Button
                variant={visaoTemporal === "mes" ? "secondary" : "ghost"}
                size="sm"
                className="h-7 text-xs"
                onClick={() => setVisaoTemporal("mes")}
              >
                Mes
              </Button>
            </div>
          </div>
        </div>

        {/* Contadores de status */}
        <div className="flex items-center gap-4 py-3 border-b border-border/30 flex-shrink-0">
          <button
            onClick={() => setFiltroStatus("todos")}
            className={`text-xs font-medium px-2 py-1 rounded ${filtroStatus === "todos" ? "bg-muted" : ""}`}
          >
            Todos ({acoes.length})
          </button>
          <button
            onClick={() => setFiltroStatus("pendente")}
            className={`flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded ${filtroStatus === "pendente" ? "bg-yellow-500/10" : ""}`}
          >
            <Circle className="h-3 w-3 text-yellow-600 fill-yellow-600" />
            Pendentes ({contadores.pendente})
          </button>
          <button
            onClick={() => setFiltroStatus("em_andamento")}
            className={`flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded ${filtroStatus === "em_andamento" ? "bg-blue-500/10" : ""}`}
          >
            <Clock className="h-3 w-3 text-blue-600" />
            Em Andamento ({contadores.em_andamento})
          </button>
          <button
            onClick={() => setFiltroStatus("atrasado")}
            className={`flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded ${filtroStatus === "atrasado" ? "bg-red-500/10" : ""}`}
          >
            <AlertTriangle className="h-3 w-3 text-red-600" />
            Atrasados ({contadores.atrasado})
          </button>
          <button
            onClick={() => setFiltroStatus("concluido")}
            className={`flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded ${filtroStatus === "concluido" ? "bg-green-500/10" : ""}`}
          >
            <CheckCircle2 className="h-3 w-3 text-green-600" />
            Concluidos ({contadores.concluido})
          </button>
          <div className="flex-1" />
          {/* Filtro origem */}
          <div className="flex items-center gap-1">
            <span className="text-[10px] text-muted-foreground uppercase tracking-wide mr-1">Origem:</span>
            <button
              onClick={() => setFiltroOrigem("todos")}
              className={`text-[10px] px-1.5 py-0.5 rounded ${filtroOrigem === "todos" ? "bg-muted font-medium" : ""}`}
            >
              Todos
            </button>
            {(Object.keys(origemConfig) as Origem[]).map((origem) => (
              <button
                key={origem}
                onClick={() => setFiltroOrigem(origem)}
                className={`text-[10px] px-1.5 py-0.5 rounded border ${filtroOrigem === origem ? origemConfig[origem].color : "border-transparent"}`}
              >
                {origemConfig[origem].label}
              </button>
            ))}
          </div>
        </div>

        {/* Conteudo Principal */}
        <div className="flex-1 flex gap-0 min-h-0 mt-3">
          {/* Tabela de Acoes */}
          <div className={`flex-1 flex flex-col min-h-0 ${selectedAcao ? "pr-4" : ""}`}>
            <ScrollArea className="flex-1">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-background z-10">
                  <tr className="border-b border-border/50">
                    <th className="text-left py-2 px-3 text-[10px] font-medium text-muted-foreground uppercase tracking-wide w-[80px]">
                      ID
                    </th>
                    <th className="text-left py-2 px-3 text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
                      Acao
                    </th>
                    <th className="text-left py-2 px-3 text-[10px] font-medium text-muted-foreground uppercase tracking-wide w-[100px]">
                      Origem
                    </th>
                    <th className="text-left py-2 px-3 text-[10px] font-medium text-muted-foreground uppercase tracking-wide w-[110px]">
                      Status
                    </th>
                    <th className="text-left py-2 px-3 text-[10px] font-medium text-muted-foreground uppercase tracking-wide w-[70px]">
                      Prior.
                    </th>
                    <th className="text-left py-2 px-3 text-[10px] font-medium text-muted-foreground uppercase tracking-wide w-[90px]">
                      Prazo
                    </th>
                    <th className="text-center py-2 px-3 text-[10px] font-medium text-muted-foreground uppercase tracking-wide w-[60px]">
                      Anexos
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {acoesFiltradas.map((acao) => {
                    const StatusIcon = statusConfig[acao.status].icon
                    return (
                      <tr
                        key={acao.id}
                        onClick={() => setSelectedAcao(acao)}
                        className={`border-b border-border/30 hover:bg-muted/30 cursor-pointer transition-colors ${selectedAcao?.id === acao.id ? "bg-muted/50" : ""}`}
                      >
                        <td className="py-2.5 px-3 font-mono text-xs text-muted-foreground">{acao.id}</td>
                        <td className="py-2.5 px-3">
                          <div className="font-medium text-foreground">{acao.titulo}</div>
                          <div className="text-xs text-muted-foreground truncate max-w-[300px]">{acao.descricao}</div>
                        </td>
                        <td className="py-2.5 px-3">
                          <span
                            className={`inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded border ${origemConfig[acao.origem].color}`}
                          >
                            {origemConfig[acao.origem].label}
                          </span>
                        </td>
                        <td className="py-2.5 px-3">
                          <span
                            className={`inline-flex items-center gap-1.5 text-xs ${statusConfig[acao.status].color}`}
                          >
                            <StatusIcon className="h-3.5 w-3.5" />
                            {statusConfig[acao.status].label}
                          </span>
                        </td>
                        <td className="py-2.5 px-3">
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded border ${prioridadeConfig[acao.prioridade].color}`}
                          >
                            {prioridadeConfig[acao.prioridade].label}
                          </span>
                        </td>
                        <td className="py-2.5 px-3">
                          <span
                            className={`text-xs font-medium tabular-nums ${acao.status === "atrasado" ? "text-red-600" : ""}`}
                          >
                            {acao.prazo}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-center">
                          <div className="flex items-center justify-center gap-2 text-muted-foreground">
                            {acao.anexos > 0 && (
                              <span className="flex items-center gap-0.5 text-xs">
                                <Paperclip className="h-3 w-3" />
                                {acao.anexos}
                              </span>
                            )}
                            {acao.comentarios > 0 && (
                              <span className="flex items-center gap-0.5 text-xs">
                                <MessageSquare className="h-3 w-3" />
                                {acao.comentarios}
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </ScrollArea>
          </div>

          {/* Painel Lateral de Contexto */}
          {selectedAcao && (
            <div className="w-[360px] border-l border-border/50 pl-4 flex flex-col min-h-0">
              <div className="flex items-center justify-between pb-3 border-b border-border/30 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-muted-foreground">{selectedAcao.id}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded border ${prioridadeConfig[selectedAcao.prioridade].color}`}
                  >
                    {prioridadeConfig[selectedAcao.prioridade].label}
                  </span>
                </div>
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setSelectedAcao(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <ScrollArea className="flex-1 mt-3">
                <div className="space-y-4">
                  {/* Titulo e descricao */}
                  <div>
                    <h3 className="font-semibold text-foreground">{selectedAcao.titulo}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{selectedAcao.descricao}</p>
                  </div>

                  {/* Detalhes */}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-[10px] text-muted-foreground uppercase tracking-wide block mb-0.5">
                        Origem
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 text-xs px-1.5 py-0.5 rounded border ${origemConfig[selectedAcao.origem].color}`}
                      >
                        {origemConfig[selectedAcao.origem].label}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-muted-foreground uppercase tracking-wide block mb-0.5">
                        Status
                      </span>
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs ${statusConfig[selectedAcao.status].color}`}
                      >
                        {statusConfig[selectedAcao.status].label}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-muted-foreground uppercase tracking-wide block mb-0.5">
                        Responsavel
                      </span>
                      <span className="text-xs font-medium">{selectedAcao.responsavel}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-muted-foreground uppercase tracking-wide block mb-0.5">
                        Prazo
                      </span>
                      <span
                        className={`text-xs font-medium tabular-nums ${selectedAcao.status === "atrasado" ? "text-red-600" : ""}`}
                      >
                        {selectedAcao.prazo}
                      </span>
                    </div>
                  </div>

                  {/* Historico */}
                  <div>
                    <div className="flex items-center gap-1.5 mb-2">
                      <History className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-[10px] text-muted-foreground uppercase tracking-wide">Historico</span>
                    </div>
                    <div className="space-y-2">
                      {selectedAcao.historico.map((h, i) => (
                        <div key={i} className="flex gap-2 text-xs">
                          <span className="text-muted-foreground tabular-nums shrink-0">{h.data}</span>
                          <div>
                            <span className="text-foreground">{h.acao}</span>
                            <span className="text-muted-foreground"> - {h.usuario}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Acoes */}
                  <div className="pt-3 border-t border-border/30 space-y-2">
                    <Button className="w-full" size="sm">
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Marcar como Concluido
                    </Button>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Comentar
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        <Paperclip className="h-4 w-4 mr-1" />
                        Anexar
                      </Button>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  )
}
