"use client"

import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  MessageSquare,
  Bell,
  ChevronLeft,
  ChevronRight,
  Eye,
  Check,
  X,
  FileText,
  ShoppingCart,
  Receipt,
  FileSignature,
  Clock,
  Calendar,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

// Mock de comunicados
const comunicados = [
  { id: 1, titulo: "Reunião de alinhamento", data: "14/01/2025", lido: false },
  { id: 2, titulo: "Novo procedimento de segurança", data: "13/01/2025", lido: false },
  { id: 3, titulo: "Atualização do sistema", data: "10/01/2025", lido: true },
]

// Mock de fila de trabalho
const filaTarefas = [
  {
    id: 1,
    tipo: "aprovacao",
    titulo: "Aprovação de BDI - Duplicação BR-101",
    solicitante: "Carlos Mendes",
    departamento: "Comercial",
    valor: "R$ 1.197.000,00",
    prazo: "14/01/2025",
    prioridade: "alta",
  },
  {
    id: 2,
    tipo: "requisicao",
    titulo: "Requisição de Compra - Aço CA-50",
    solicitante: "Roberto Silva",
    departamento: "Suprimentos",
    valor: "R$ 157.500,00",
    prazo: "19/01/2025",
    prioridade: "urgente",
  },
  {
    id: 3,
    tipo: "medicao",
    titulo: "Medição #01 - Mobilização",
    solicitante: "Ana Paula Costa",
    departamento: "Comercial",
    valor: "R$ 84.000,00",
    prazo: "04/02/2025",
    prioridade: "alta",
  },
  {
    id: 4,
    tipo: "contrato",
    titulo: "Revisão de Contrato - Aditivo Prazo",
    solicitante: "Mariana Lopes",
    departamento: "Jurídico",
    valor: "-",
    prazo: "31/01/2025",
    prioridade: "media",
  },
  {
    id: 5,
    tipo: "aprovacao",
    titulo: "Aprovação de Subcontrato - Fundações",
    solicitante: "Pedro Augusto",
    departamento: "Engenharia",
    valor: "R$ 320.000,00",
    prazo: "24/01/2025",
    prioridade: "alta",
  },
]

// Mock de marcos do calendário
const marcosDoMes = [
  { id: 1, nome: "Início da Mobilização", data: "14 de jan", tipo: "marco" },
  { id: 2, nome: "Medição #01", data: "04 de fev", tipo: "medicao" },
  { id: 3, nome: "Início Fundações", data: "14 de fev", tipo: "entrega" },
  { id: 4, nome: "Medição #02", data: "04 de mar", tipo: "medicao" },
  { id: 5, nome: "Reunião de Acompanhamento", data: "14 de mar", tipo: "reuniao" },
]

const getTipoIcon = (tipo: string) => {
  switch (tipo) {
    case "aprovacao":
      return FileText
    case "requisicao":
      return ShoppingCart
    case "medicao":
      return Receipt
    case "contrato":
      return FileSignature
    default:
      return FileText
  }
}

const getMarcoCor = (tipo: string) => {
  switch (tipo) {
    case "marco":
      return "bg-primary"
    case "medicao":
      return "bg-primary/70"
    case "entrega":
      return "bg-primary/50"
    case "reuniao":
      return "bg-primary/30"
    default:
      return "bg-muted-foreground"
  }
}

export default function IntranetPage() {
  const [mesAtual, setMesAtual] = useState(new Date(2025, 0, 1))
  const naoLidos = comunicados.filter((c) => !c.lido).length
  const pendentes = filaTarefas.length
  const concluidas = 0

  const primeiroDia = new Date(mesAtual.getFullYear(), mesAtual.getMonth(), 1)
  const ultimoDia = new Date(mesAtual.getFullYear(), mesAtual.getMonth() + 1, 0)
  const diasNoMes = ultimoDia.getDate()
  const primeiroDiaSemana = primeiroDia.getDay()

  const diasCalendario = []
  for (let i = 0; i < primeiroDiaSemana; i++) {
    diasCalendario.push(null)
  }
  for (let i = 1; i <= diasNoMes; i++) {
    diasCalendario.push(i)
  }

  const nomeMes = mesAtual.toLocaleDateString("pt-BR", { month: "long", year: "numeric" })

  return (
    <AppLayout>
      <div className="flex-1 overflow-auto p-4 md:p-6 space-y-5 bg-background">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Intranet</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Visao geral da obra e tarefas pendentes</p>
          </div>
        </div>

        {/* Grid principal */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          {/* Coluna esquerda */}
          <div className="xl:col-span-2 space-y-5">
            {/* Comunicados */}
            <Card className="shadow-sm border-border bg-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-primary shadow-sm">
                    <MessageSquare className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-base font-semibold text-card-foreground">Comunicados</CardTitle>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20">
                    <Bell className="w-3.5 h-3.5 text-primary" />
                    <span className="text-primary font-medium">{naoLidos} nao lidos</span>
                  </div>
                  <span className="text-muted-foreground hidden sm:inline">|</span>
                  <span className="text-muted-foreground hidden sm:inline">{comunicados.length} total</span>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
                  <div className="p-4 rounded-full bg-muted mb-4">
                    <MessageSquare className="w-8 h-8 opacity-50" />
                  </div>
                  <span className="text-sm">Nao foi possivel carregar os comunicados</span>
                </div>
              </CardContent>
            </Card>

            {/* Fila de Trabalho */}
            <Card className="shadow-sm border-border bg-card overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-primary shadow-sm">
                    <Clock className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-base font-semibold text-card-foreground">Fila de Trabalho</CardTitle>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20">
                    <Clock className="w-3.5 h-3.5 text-primary" />
                    <span className="text-primary font-medium">{pendentes} pendentes</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted border border-border">
                    <Check className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="text-muted-foreground font-medium">{concluidas} concluidas</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[720px]">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3">
                          Tipo
                        </th>
                        <th className="text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3">
                          Titulo
                        </th>
                        <th className="text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3">
                          Solicitante
                        </th>
                        <th className="text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3">
                          Valor
                        </th>
                        <th className="text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3">
                          Prazo
                        </th>
                        <th className="text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3">
                          Prioridade
                        </th>
                        <th className="text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3">
                          Acoes
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {filaTarefas.map((tarefa) => {
                        const Icon = getTipoIcon(tarefa.tipo)
                        return (
                          <tr key={tarefa.id} className="hover:bg-muted/30 transition-colors group">
                            <td className="px-4 py-3.5">
                              <div className="p-2 rounded-lg bg-muted w-fit group-hover:bg-muted/80 transition-colors">
                                <Icon className="w-4 h-4 text-muted-foreground" />
                              </div>
                            </td>
                            <td className="px-4 py-3.5">
                              <span className="text-sm font-medium text-foreground">{tarefa.titulo}</span>
                            </td>
                            <td className="px-4 py-3.5">
                              <div className="flex flex-col">
                                <span className="text-sm font-medium text-foreground">{tarefa.solicitante}</span>
                                <span className="text-xs text-muted-foreground">{tarefa.departamento}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3.5">
                              <span className="text-sm font-semibold text-foreground tabular-nums">{tarefa.valor}</span>
                            </td>
                            <td className="px-4 py-3.5">
                              <span className="text-sm text-muted-foreground tabular-nums">{tarefa.prazo}</span>
                            </td>
                            <td className="px-4 py-3.5">
                              <span
                                className={cn(
                                  "text-xs px-2.5 py-1 rounded-full font-semibold capitalize inline-block",
                                  tarefa.prioridade === "urgente" &&
                                    "bg-destructive/10 text-destructive border border-destructive/20",
                                  tarefa.prioridade === "alta" && "bg-primary/10 text-primary border border-primary/20",
                                  tarefa.prioridade === "media" &&
                                    "bg-muted text-muted-foreground border border-border",
                                )}
                              >
                                {tarefa.prioridade}
                              </span>
                            </td>
                            <td className="px-4 py-3.5">
                              <div className="flex items-center gap-1">
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg hover:bg-muted">
                                  <Eye className="w-4 h-4 text-muted-foreground" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 rounded-lg hover:bg-primary/10"
                                >
                                  <Check className="w-4 h-4 text-primary" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 rounded-lg hover:bg-destructive/10"
                                >
                                  <X className="w-4 h-4 text-destructive" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Coluna direita - Calendario */}
          <div className="space-y-5">
            <Card className="shadow-sm border-border bg-card">
              <CardHeader className="pb-3 border-b border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-primary shadow-sm">
                      <Calendar className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-base font-semibold text-card-foreground">Marcos e eventos</CardTitle>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-destructive/10 border border-destructive/20 rounded-full">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive"></span>
                    </span>
                    <span className="text-sm font-semibold text-destructive">{pendentes} pendentes</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4 space-y-5">
                {/* Navegacao do mes */}
                <div className="flex items-center justify-between px-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 rounded-lg hover:bg-muted"
                    onClick={() => setMesAtual(new Date(mesAtual.getFullYear(), mesAtual.getMonth() - 1, 1))}
                  >
                    <ChevronLeft className="w-4 h-4 text-muted-foreground" />
                  </Button>
                  <span className="text-sm font-semibold capitalize text-foreground">{nomeMes}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 rounded-lg hover:bg-muted"
                    onClick={() => setMesAtual(new Date(mesAtual.getFullYear(), mesAtual.getMonth() + 1, 1))}
                  >
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </Button>
                </div>

                {/* Calendario */}
                <div className="grid grid-cols-7 gap-1">
                  {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"].map((dia) => (
                    <div key={dia} className="text-[10px] font-bold text-muted-foreground uppercase text-center py-2">
                      {dia}
                    </div>
                  ))}
                  {diasCalendario.map((dia, index) => (
                    <div
                      key={index}
                      className={cn(
                        "text-sm h-9 flex items-center justify-center rounded-lg transition-all cursor-pointer",
                        dia === 14 && "bg-primary text-primary-foreground font-bold shadow-md",
                        dia && dia !== 14 && "hover:bg-muted text-foreground",
                        !dia && "invisible",
                      )}
                    >
                      {dia}
                    </div>
                  ))}
                </div>

                {/* Marcos do mes */}
                <div className="pt-3 border-t border-border">
                  <h4 className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-3">
                    Marcos do Mes
                  </h4>
                  <div className="p-3 bg-primary/10 rounded-xl border border-primary/20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-3 h-3 rounded-full bg-primary shadow-sm" />
                        <span className="text-sm font-semibold text-foreground">Inicio da Mobilizacao</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">14 de jan</span>
                        <Button size="sm" variant="outline" className="h-7 text-xs px-3 bg-transparent">
                          Concluir
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Proximos marcos */}
                <div className="pt-1">
                  <h4 className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-3">
                    Proximos Marcos
                  </h4>
                  <div className="space-y-2">
                    {marcosDoMes.map((marco) => (
                      <div
                        key={marco.id}
                        className="flex items-center justify-between py-2 px-2 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className={cn("w-2 h-2 rounded-full", getMarcoCor(marco.tipo))} />
                          <span className="text-sm text-foreground">{marco.nome}</span>
                        </div>
                        <span className="text-xs text-muted-foreground tabular-nums">{marco.data}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Legenda */}
                <div className="pt-3 border-t border-border">
                  <h4 className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-3">Legenda</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-muted/50">
                      <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                      <span className="text-xs text-muted-foreground">Marco</span>
                    </div>
                    <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-muted/50">
                      <div className="w-2.5 h-2.5 rounded-full bg-primary/70" />
                      <span className="text-xs text-muted-foreground">Medicao</span>
                    </div>
                    <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-muted/50">
                      <div className="w-2.5 h-2.5 rounded-full bg-primary/50" />
                      <span className="text-xs text-muted-foreground">Entrega</span>
                    </div>
                    <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-muted/50">
                      <div className="w-2.5 h-2.5 rounded-full bg-primary/30" />
                      <span className="text-xs text-muted-foreground">Reuniao</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
