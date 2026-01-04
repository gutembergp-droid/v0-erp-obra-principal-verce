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

const getPrioridadeStyle = (prioridade: string) => {
  switch (prioridade) {
    case "urgente":
      return "bg-red-100 text-red-700"
    case "alta":
      return "bg-orange-100 text-orange-700"
    case "media":
      return "bg-yellow-100 text-yellow-700"
    default:
      return "bg-gray-100 text-gray-700"
  }
}

const getMarcoCor = (tipo: string) => {
  switch (tipo) {
    case "marco":
      return "bg-orange-500"
    case "medicao":
      return "bg-green-500"
    case "entrega":
      return "bg-blue-500"
    case "reuniao":
      return "bg-purple-500"
    default:
      return "bg-gray-500"
  }
}

export default function IntranetPage() {
  const [mesAtual, setMesAtual] = useState(new Date(2025, 0, 1)) // Janeiro 2025
  const naoLidos = comunicados.filter((c) => !c.lido).length
  const pendentes = filaTarefas.length
  const concluidas = 0

  // Gerar dias do mês
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
      <div className="p-4 md:p-6 space-y-5 min-h-screen bg-gradient-to-br from-slate-50 to-slate-100/50">
        {/* Header da pagina - Melhor alinhamento e espacamento */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Intranet</h1>
            <p className="text-sm text-slate-500 mt-0.5">Visao geral da obra e tarefas pendentes</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-red-50 border border-red-200 rounded-full self-start sm:self-auto">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-sm font-semibold text-red-700">{pendentes} pendentes</span>
          </div>
        </div>

        {/* Grid principal - Gap aumentado para melhor respiracao */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          {/* Coluna esquerda - Comunicados e Fila */}
          <div className="xl:col-span-2 space-y-5">
            {/* Comunicados - Card com sombra e borda mais suave */}
            <Card className="shadow-sm border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-sm shadow-blue-200">
                    <MessageSquare className="w-4 h-4 text-white" />
                  </div>
                  <CardTitle className="text-base font-semibold text-slate-800">Comunicados</CardTitle>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200">
                    <Bell className="w-3.5 h-3.5 text-amber-600" />
                    <span className="text-amber-700 font-medium">{naoLidos} não lidos</span>
                  </div>
                  <span className="text-slate-400 hidden sm:inline">|</span>
                  <span className="text-slate-500 hidden sm:inline">{comunicados.length} total</span>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center justify-center py-10 text-slate-400">
                  <div className="p-4 rounded-full bg-slate-100 mb-4">
                    <MessageSquare className="w-8 h-8 opacity-50" />
                  </div>
                  <span className="text-sm">Nao foi possivel carregar os comunicados</span>
                </div>
              </CardContent>
            </Card>

            {/* Fila de Trabalho - Tabela com visual mais limpo */}
            <Card className="shadow-sm border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-sm shadow-amber-200">
                    <Clock className="w-4 h-4 text-white" />
                  </div>
                  <CardTitle className="text-base font-semibold text-slate-800">Fila de Trabalho</CardTitle>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span className="text-amber-700 font-medium">{pendentes} pendentes</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-medium">{concluidas} concluidas</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[720px]">
                    <thead>
                      <tr className="bg-slate-50/80">
                        <th className="text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">
                          Tipo
                        </th>
                        <th className="text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">
                          Titulo
                        </th>
                        <th className="text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">
                          Solicitante
                        </th>
                        <th className="text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">
                          Valor
                        </th>
                        <th className="text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">
                          Prazo
                        </th>
                        <th className="text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">
                          Prioridade
                        </th>
                        <th className="text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">
                          Acoes
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filaTarefas.map((tarefa) => {
                        const Icon = getTipoIcon(tarefa.tipo)
                        return (
                          <tr key={tarefa.id} className="hover:bg-slate-50/50 transition-colors group">
                            <td className="px-4 py-3.5">
                              <div className="p-2 rounded-lg bg-slate-100 w-fit group-hover:bg-slate-200/70 transition-colors">
                                <Icon className="w-4 h-4 text-slate-600" />
                              </div>
                            </td>
                            <td className="px-4 py-3.5">
                              <span className="text-sm font-medium text-slate-800">{tarefa.titulo}</span>
                            </td>
                            <td className="px-4 py-3.5">
                              <div className="flex flex-col">
                                <span className="text-sm font-medium text-slate-700">{tarefa.solicitante}</span>
                                <span className="text-xs text-slate-400">{tarefa.departamento}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3.5">
                              <span className="text-sm font-semibold text-slate-800 tabular-nums">{tarefa.valor}</span>
                            </td>
                            <td className="px-4 py-3.5">
                              <span className="text-sm text-slate-600 tabular-nums">{tarefa.prazo}</span>
                            </td>
                            <td className="px-4 py-3.5">
                              <span
                                className={cn(
                                  "text-xs px-2.5 py-1 rounded-full font-semibold capitalize inline-block",
                                  tarefa.prioridade === "urgente" && "bg-red-100 text-red-700 border border-red-200",
                                  tarefa.prioridade === "alta" &&
                                    "bg-orange-100 text-orange-700 border border-orange-200",
                                  tarefa.prioridade === "media" &&
                                    "bg-yellow-100 text-yellow-700 border border-yellow-200",
                                )}
                              >
                                {tarefa.prioridade}
                              </span>
                            </td>
                            <td className="px-4 py-3.5">
                              <div className="flex items-center gap-1">
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg hover:bg-slate-200">
                                  <Eye className="w-4 h-4 text-slate-500" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 rounded-lg hover:bg-emerald-100"
                                >
                                  <Check className="w-4 h-4 text-emerald-600" />
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg hover:bg-red-100">
                                  <X className="w-4 h-4 text-red-500" />
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

          {/* Coluna direita - Calendario - Card com altura consistente */}
          <div className="space-y-5">
            <Card className="shadow-sm border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-sm shadow-violet-200">
                    <Calendar className="w-4 h-4 text-white" />
                  </div>
                  <CardTitle className="text-base font-semibold text-slate-800">Marcos e eventos</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-4 space-y-5">
                {/* Navegacao do mes - Estilo mais limpo */}
                <div className="flex items-center justify-between px-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 rounded-lg hover:bg-slate-100"
                    onClick={() => setMesAtual(new Date(mesAtual.getFullYear(), mesAtual.getMonth() - 1, 1))}
                  >
                    <ChevronLeft className="w-4 h-4 text-slate-600" />
                  </Button>
                  <span className="text-sm font-semibold capitalize text-slate-800">{nomeMes}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 rounded-lg hover:bg-slate-100"
                    onClick={() => setMesAtual(new Date(mesAtual.getFullYear(), mesAtual.getMonth() + 1, 1))}
                  >
                    <ChevronRight className="w-4 h-4 text-slate-600" />
                  </Button>
                </div>

                {/* Calendario - Grid com espacamento uniforme */}
                <div className="grid grid-cols-7 gap-1">
                  {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"].map((dia) => (
                    <div key={dia} className="text-[10px] font-bold text-slate-400 uppercase text-center py-2">
                      {dia}
                    </div>
                  ))}
                  {diasCalendario.map((dia, index) => (
                    <div
                      key={index}
                      className={cn(
                        "text-sm h-9 flex items-center justify-center rounded-lg transition-all cursor-pointer",
                        dia === 14 &&
                          "bg-gradient-to-br from-amber-500 to-orange-500 text-white font-bold shadow-md shadow-amber-200",
                        dia && dia !== 14 && "hover:bg-slate-100 text-slate-700",
                        !dia && "invisible",
                      )}
                    >
                      {dia}
                    </div>
                  ))}
                </div>

                {/* Marcos do mes - Card destacado */}
                <div className="pt-3 border-t border-slate-100">
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">Marcos do Mês</h4>
                  <div className="p-3 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-3 h-3 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 shadow-sm" />
                        <span className="text-sm font-semibold text-slate-800">Inicio da Mobilizacao</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500">14 de jan</span>
                        <Button
                          size="sm"
                          className="h-7 text-xs px-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-sm"
                        >
                          Concluir
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Proximos marcos - Lista com espacamento melhorado */}
                <div className="pt-1">
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">
                    Proximos Marcos
                  </h4>
                  <div className="space-y-2">
                    {marcosDoMes.map((marco) => (
                      <div
                        key={marco.id}
                        className="flex items-center justify-between py-2 px-2 rounded-lg hover:bg-slate-50 transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className={cn("w-2 h-2 rounded-full", getMarcoCor(marco.tipo))} />
                          <span className="text-sm text-slate-700">{marco.nome}</span>
                        </div>
                        <span className="text-xs text-slate-400 tabular-nums">{marco.data}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Legenda - Grid mais compacto */}
                <div className="pt-3 border-t border-slate-100">
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">Legenda</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-slate-50">
                      <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                      <span className="text-xs text-slate-600">Marco</span>
                    </div>
                    <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-slate-50">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                      <span className="text-xs text-slate-600">Medicao</span>
                    </div>
                    <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-slate-50">
                      <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                      <span className="text-xs text-slate-600">Entrega</span>
                    </div>
                    <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-slate-50">
                      <div className="w-2.5 h-2.5 rounded-full bg-violet-500" />
                      <span className="text-xs text-slate-600">Reuniao</span>
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
