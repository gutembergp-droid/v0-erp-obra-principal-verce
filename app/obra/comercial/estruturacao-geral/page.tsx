"use client"

import { Suspense, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { InfoTooltip } from "@/components/ui/info-tooltip"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  XCircle,
  ArrowRight,
  FileText,
  Printer,
  RefreshCw,
  X,
  Calendar,
  User,
  History,
} from "lucide-react"
import Link from "next/link"

// Dados mockados
const estruturas = [
  {
    id: "contrato",
    nome: "Estruturacao do Contrato",
    descricao: "Definicao de termos, clausulas, aditivos e condicoes contratuais",
    status: "homologado",
    atualizacao: "02/01/2026 14:30",
    responsavel: "Maria Silva",
    rota: "/obra/comercial/estruturacao-contrato",
    historico: [
      { data: "02/01/2026", acao: "Homologado", usuario: "Diretor" },
      { data: "28/12/2025", acao: "Revisado", usuario: "Maria Silva" },
      { data: "20/12/2025", acao: "Criado", usuario: "Maria Silva" },
    ],
  },
  {
    id: "medicao",
    nome: "Estruturacao da Medicao",
    descricao: "Configuracao de ciclos, boletins e criterios de medicao",
    status: "homologado",
    atualizacao: "03/01/2026 09:15",
    responsavel: "Carlos Souza",
    rota: "/obra/comercial/estruturacao-medicao",
    historico: [
      { data: "03/01/2026", acao: "Homologado", usuario: "Diretor" },
      { data: "01/01/2026", acao: "Revisado", usuario: "Carlos Souza" },
    ],
  },
  {
    id: "custo",
    nome: "Estruturacao do Custo",
    descricao: "EAP de Custo, Meta 0.9, centros de custo e apropriacao",
    status: "revisado",
    atualizacao: "04/01/2026 16:45",
    responsavel: "Ana Costa",
    rota: "/obra/comercial/estruturacao-custo",
    historico: [
      { data: "04/01/2026", acao: "Revisado", usuario: "Ana Costa" },
      { data: "02/01/2026", acao: "Em Estruturacao", usuario: "Ana Costa" },
    ],
  },
  {
    id: "suprimentos",
    nome: "Estruturacao de Suprimentos",
    descricao: "Compor 90, categorias de insumos, fornecedores homologados",
    status: "em_estruturacao",
    atualizacao: "05/01/2026 10:20",
    responsavel: "Pedro Lima",
    rota: "/obra/comercial/estruturacao-suprimentos",
    historico: [{ data: "05/01/2026", acao: "Em Estruturacao", usuario: "Pedro Lima" }],
  },
  {
    id: "indireto",
    nome: "Estruturacao do Indireto",
    descricao: "Custos indiretos, DAG, overhead e rateios",
    status: "nao_iniciado",
    atualizacao: "—",
    responsavel: "—",
    rota: "/obra/comercial/estruturacao-indireto",
    historico: [],
  },
]

const alertas = [
  { tipo: "critico", mensagem: "Estrutura de Indireto nao iniciada - bloqueia fechamento mensal" },
  { tipo: "atencao", mensagem: "Estrutura de Suprimentos em andamento - aguardando homologacao" },
  { tipo: "info", mensagem: "Estrutura de Custo revisada - pendente aprovacao final" },
]

const statusConfig: Record<string, { label: string; bgClass: string; icon: typeof CheckCircle2 }> = {
  nao_iniciado: { label: "Nao Iniciado", bgClass: "bg-muted text-muted-foreground", icon: XCircle },
  em_estruturacao: { label: "Em Estruturacao", bgClass: "bg-accent-foreground/10 text-accent-foreground", icon: Clock },
  revisado: { label: "Revisado", bgClass: "bg-primary/10 text-primary", icon: RefreshCw },
  homologado: { label: "Homologado", bgClass: "bg-primary/20 text-primary", icon: CheckCircle2 },
}

function getStatusGeral() {
  const todosHomologados = estruturas.every((e) => e.status === "homologado")
  const algumEmAndamento = estruturas.some((e) => e.status === "em_estruturacao" || e.status === "revisado")
  const algumNaoIniciado = estruturas.some((e) => e.status === "nao_iniciado")

  if (todosHomologados) return { label: "Homologada", bgClass: "bg-primary" }
  if (algumNaoIniciado) return { label: "Incompleta", bgClass: "bg-destructive" }
  if (algumEmAndamento) return { label: "Em Andamento", bgClass: "bg-accent-foreground" }
  return { label: "Nao Iniciada", bgClass: "bg-muted" }
}

function getLiberacao(tipo: string) {
  const estruturasRequeridas: Record<string, string[]> = {
    producao: ["contrato", "custo"],
    suprimentos: ["contrato", "suprimentos"],
    medicao: ["contrato", "medicao", "custo"],
  }

  const requeridas = estruturasRequeridas[tipo] || []
  const todasHomologadas = requeridas.every((id) => estruturas.find((e) => e.id === id)?.status === "homologado")

  return todasHomologadas
}

function EstruturacaoGeralContent() {
  const [painelAberto, setPainelAberto] = useState(false)
  const [estruturaSelecionada, setEstruturaSelecionada] = useState<(typeof estruturas)[0] | null>(null)

  const statusGeral = getStatusGeral()
  const homologadas = estruturas.filter((e) => e.status === "homologado").length
  const total = estruturas.length

  const abrirPainel = (estrutura: (typeof estruturas)[0]) => {
    setEstruturaSelecionada(estrutura)
    setPainelAberto(true)
  }

  return (
    <div className="overflow-auto h-full">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-foreground">Estruturacao da Obra</h1>
            <InfoTooltip
              title="Visao Geral"
              description="Status consolidado das 5 estruturas obrigatorias para operacao da obra."
            />
            <Badge variant="outline" className="text-[10px] font-mono">
              EST-00
            </Badge>
            <Badge className={`${statusGeral.bgClass} text-[10px]`}>{statusGeral.label}</Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              {homologadas}/{total} estruturas homologadas
            </span>
            <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs bg-transparent">
              <Printer className="w-3.5 h-3.5" />
            </Button>
            <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs bg-transparent">
              <FileText className="w-3.5 h-3.5" />
              Relatorio
            </Button>
          </div>
        </div>

        {/* Subtitulo */}
        <p className="text-sm text-muted-foreground -mt-4">Base economica e operacional do contrato</p>

        {/* Grid Principal */}
        <div className="grid grid-cols-12 gap-4">
          {/* Checklist de Estruturacao - 8 colunas */}
          <div className="col-span-8 border border-border rounded-lg overflow-hidden">
            <div className="bg-muted/30 px-4 py-2 border-b border-border">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Checklist de Estruturacao
              </span>
            </div>

            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/20">
                  <th className="text-left text-[10px] font-semibold uppercase text-muted-foreground px-4 py-2">
                    Estrutura
                  </th>
                  <th className="text-left text-[10px] font-semibold uppercase text-muted-foreground px-4 py-2">
                    Status
                  </th>
                  <th className="text-left text-[10px] font-semibold uppercase text-muted-foreground px-4 py-2">
                    Ultima Atualizacao
                  </th>
                  <th className="text-center text-[10px] font-semibold uppercase text-muted-foreground px-4 py-2">
                    Acao
                  </th>
                </tr>
              </thead>
              <tbody>
                {estruturas.map((estrutura, index) => {
                  const config = statusConfig[estrutura.status]
                  const StatusIcon = config.icon

                  return (
                    <tr
                      key={estrutura.id}
                      className={`border-b border-border/50 hover:bg-muted/20 transition-colors cursor-pointer ${
                        index === estruturas.length - 1 ? "border-b-0" : ""
                      }`}
                      onClick={() => abrirPainel(estrutura)}
                    >
                      <td className="px-4 py-3">
                        <div>
                          <p className="text-sm font-medium text-foreground">{estrutura.nome}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{estrutura.descricao}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <StatusIcon className="w-3.5 h-3.5" />
                          <Badge variant="outline" className={`text-[10px] ${config.bgClass}`}>
                            {config.label}
                          </Badge>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs text-muted-foreground font-mono">{estrutura.atualizacao}</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Link href={estrutura.rota} onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="sm" className="h-7 text-xs gap-1 hover:text-primary">
                            Acessar
                            <ArrowRight className="w-3 h-3" />
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Coluna Direita - 4 colunas */}
          <div className="col-span-4 space-y-4">
            {/* Impacto Operacional */}
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="bg-muted/30 px-4 py-2 border-b border-border">
                <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Liberacao Operacional
                </span>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Producao</span>
                  {getLiberacao("producao") ? (
                    <Badge className="bg-primary/10 text-primary text-[10px]">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Liberado
                    </Badge>
                  ) : (
                    <Badge className="bg-destructive/10 text-destructive text-[10px]">
                      <XCircle className="w-3 h-3 mr-1" />
                      Bloqueado
                    </Badge>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Suprimentos</span>
                  {getLiberacao("suprimentos") ? (
                    <Badge className="bg-primary/10 text-primary text-[10px]">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Liberado
                    </Badge>
                  ) : (
                    <Badge className="bg-destructive/10 text-destructive text-[10px]">
                      <XCircle className="w-3 h-3 mr-1" />
                      Bloqueado
                    </Badge>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Medicao</span>
                  {getLiberacao("medicao") ? (
                    <Badge className="bg-primary/10 text-primary text-[10px]">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Liberado
                    </Badge>
                  ) : (
                    <Badge className="bg-destructive/10 text-destructive text-[10px]">
                      <XCircle className="w-3 h-3 mr-1" />
                      Bloqueado
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Alertas */}
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="bg-muted/30 px-4 py-2 border-b border-border">
                <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Alertas de Estruturacao
                </span>
              </div>
              <div className="p-3 space-y-2">
                {alertas.map((alerta, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-2 p-2 rounded text-xs border ${
                      alerta.tipo === "critico"
                        ? "bg-destructive/10 text-destructive border-destructive/20"
                        : alerta.tipo === "atencao"
                          ? "bg-accent-foreground/10 text-accent-foreground border-accent-foreground/20"
                          : "bg-primary/10 text-primary border-primary/20"
                    }`}
                  >
                    <AlertTriangle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                    <span>{alerta.mensagem}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Legenda de Status */}
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="bg-muted/30 px-4 py-2 border-b border-border">
                <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Legenda</span>
              </div>
              <div className="p-3 space-y-2">
                {Object.entries(statusConfig).map(([key, config]) => {
                  const Icon = config.icon
                  return (
                    <div key={key} className="flex items-center gap-2">
                      <Icon className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{config.label}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PAINEL LATERAL */}
      <Sheet open={painelAberto} onOpenChange={setPainelAberto}>
        <SheetContent className="w-[400px] sm:w-[450px] p-0">
          <SheetHeader className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-base">{estruturaSelecionada?.nome}</SheetTitle>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setPainelAberto(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </SheetHeader>

          <ScrollArea className="h-[calc(100vh-80px)]">
            {estruturaSelecionada && (
              <div className="p-4 space-y-4">
                {/* Status */}
                <div className="p-4 rounded-lg border border-border bg-card">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-muted-foreground">Status Atual</span>
                    <Badge className={statusConfig[estruturaSelecionada.status].bgClass}>
                      {statusConfig[estruturaSelecionada.status].label}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{estruturaSelecionada.descricao}</p>
                </div>

                {/* Responsavel */}
                <div className="p-4 rounded-lg border border-border bg-card">
                  <div className="flex items-center gap-2 mb-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-semibold">Responsavel</span>
                  </div>
                  <p className="text-sm">{estruturaSelecionada.responsavel}</p>
                </div>

                {/* Ultima Atualizacao */}
                <div className="p-4 rounded-lg border border-border bg-card">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-semibold">Ultima Atualizacao</span>
                  </div>
                  <p className="text-sm">{estruturaSelecionada.atualizacao}</p>
                </div>

                {/* Historico */}
                <div className="p-4 rounded-lg border border-border bg-card">
                  <div className="flex items-center gap-2 mb-3">
                    <History className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-semibold">Historico</span>
                  </div>
                  {estruturaSelecionada.historico.length > 0 ? (
                    <div className="space-y-2">
                      {estruturaSelecionada.historico.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between py-2 border-b border-border last:border-0"
                        >
                          <div>
                            <p className="text-xs font-medium">{item.acao}</p>
                            <p className="text-[10px] text-muted-foreground">{item.usuario}</p>
                          </div>
                          <span className="text-[10px] text-muted-foreground">{item.data}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground">Nenhum historico disponivel</p>
                  )}
                </div>

                {/* Acoes */}
                <div className="space-y-2">
                  <Link href={estruturaSelecionada.rota}>
                    <Button className="w-full">
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Acessar Estrutura
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default function EstruturacaoGeralPage() {
  return (
    <Suspense fallback={null}>
      <EstruturacaoGeralContent />
    </Suspense>
  )
}
