"use client"

import { AppLayout } from "@/components/layout/app-layout"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { InfoTooltip } from "@/components/ui/info-tooltip"
import { CheckCircle2, Clock, AlertTriangle, XCircle, ArrowRight, FileText, Printer, RefreshCw } from "lucide-react"
import Link from "next/link"

// Dados mockados
const estruturas = [
  {
    id: "contrato",
    nome: "Estruturacao do Contrato",
    descricao: "Definicao de termos, clausulas, aditivos e condicoes contratuais",
    status: "homologado",
    atualizacao: "02/01/2026 14:30",
    rota: "/obra/comercial/estrutura",
  },
  {
    id: "medicao",
    nome: "Estruturacao da Medicao",
    descricao: "Configuracao de ciclos, boletins e criterios de medicao",
    status: "homologado",
    atualizacao: "03/01/2026 09:15",
    rota: "/obra/comercial/receita",
  },
  {
    id: "custo",
    nome: "Estruturacao do Custo",
    descricao: "EAP de Custo, Meta 0.9, centros de custo e apropriacao",
    status: "revisado",
    atualizacao: "04/01/2026 16:45",
    rota: "/obra/comercial/custo",
  },
  {
    id: "suprimentos",
    nome: "Estruturacao de Suprimentos",
    descricao: "Compor 90, categorias de insumos, fornecedores homologados",
    status: "em_estruturacao",
    atualizacao: "05/01/2026 10:20",
    rota: "/obra/comercial/suprimento",
  },
  {
    id: "indireto",
    nome: "Estruturacao do Indireto",
    descricao: "Custos indiretos, DAG, overhead e rateios",
    status: "nao_iniciado",
    atualizacao: "—",
    rota: "/obra/comercial/custo",
  },
]

const alertas = [
  { tipo: "critico", mensagem: "Estrutura de Indireto nao iniciada - bloqueia fechamento mensal" },
  { tipo: "atencao", mensagem: "Estrutura de Suprimentos em andamento - aguardando homologacao" },
  { tipo: "info", mensagem: "Estrutura de Custo revisada - pendente aprovacao final" },
]

const statusConfig: Record<string, { label: string; color: string; icon: typeof CheckCircle2 }> = {
  nao_iniciado: { label: "Nao Iniciado", color: "text-muted-foreground bg-muted", icon: XCircle },
  em_estruturacao: { label: "Em Estruturacao", color: "text-yellow-600 bg-yellow-500/10", icon: Clock },
  revisado: { label: "Revisado", color: "text-blue-600 bg-blue-500/10", icon: RefreshCw },
  homologado: { label: "Homologado", color: "text-green-600 bg-green-500/10", icon: CheckCircle2 },
}

function getStatusGeral() {
  const todosHomologados = estruturas.every((e) => e.status === "homologado")
  const algumEmAndamento = estruturas.some((e) => e.status === "em_estruturacao" || e.status === "revisado")
  const algumNaoIniciado = estruturas.some((e) => e.status === "nao_iniciado")

  if (todosHomologados) return { label: "Homologada", color: "bg-green-500" }
  if (algumNaoIniciado) return { label: "Incompleta", color: "bg-red-500" }
  if (algumEmAndamento) return { label: "Em Andamento", color: "bg-yellow-500" }
  return { label: "Nao Iniciada", color: "bg-muted" }
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

export default function EstruturacaoGeralPage() {
  const statusGeral = getStatusGeral()
  const homologadas = estruturas.filter((e) => e.status === "homologado").length
  const total = estruturas.length

  return (
    <AppLayout>
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
            <Badge className={`${statusGeral.color} text-white text-[10px]`}>{statusGeral.label}</Badge>
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
                      className={`border-b border-border/50 hover:bg-muted/20 transition-colors ${
                        index === estruturas.length - 1 ? "border-b-0" : ""
                      }`}
                    >
                      <td className="px-4 py-3">
                        <div>
                          <p className="text-sm font-medium text-foreground">{estrutura.nome}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{estrutura.descricao}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <StatusIcon className={`w-3.5 h-3.5 ${config.color.split(" ")[0]}`} />
                          <Badge variant="outline" className={`text-[10px] ${config.color}`}>
                            {config.label}
                          </Badge>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs text-muted-foreground font-mono">{estrutura.atualizacao}</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Link href={estrutura.rota}>
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
                    <Badge className="bg-green-500/10 text-green-600 text-[10px]">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Liberado
                    </Badge>
                  ) : (
                    <Badge className="bg-red-500/10 text-red-600 text-[10px]">
                      <XCircle className="w-3 h-3 mr-1" />
                      Bloqueado
                    </Badge>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Suprimentos</span>
                  {getLiberacao("suprimentos") ? (
                    <Badge className="bg-green-500/10 text-green-600 text-[10px]">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Liberado
                    </Badge>
                  ) : (
                    <Badge className="bg-red-500/10 text-red-600 text-[10px]">
                      <XCircle className="w-3 h-3 mr-1" />
                      Bloqueado
                    </Badge>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Medicao</span>
                  {getLiberacao("medicao") ? (
                    <Badge className="bg-green-500/10 text-green-600 text-[10px]">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Liberado
                    </Badge>
                  ) : (
                    <Badge className="bg-red-500/10 text-red-600 text-[10px]">
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
                    className={`flex items-start gap-2 p-2 rounded text-xs ${
                      alerta.tipo === "critico"
                        ? "bg-red-500/10 text-red-600"
                        : alerta.tipo === "atencao"
                          ? "bg-yellow-500/10 text-yellow-600"
                          : "bg-blue-500/10 text-blue-600"
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
                      <Icon className={`w-3.5 h-3.5 ${config.color.split(" ")[0]}`} />
                      <span className="text-xs text-muted-foreground">{config.label}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
