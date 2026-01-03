"use client"

import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
      <div className="space-y-6">
        {/* Header da página */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Intranet</h1>
            <p className="text-sm text-gray-500">Visão geral da obra e tarefas pendentes</p>
          </div>
          <Badge variant="destructive" className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {pendentes} pendentes
          </Badge>
        </div>

        {/* Grid principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna esquerda - Comunicados e Fila */}
          <div className="lg:col-span-2 space-y-6">
            {/* Comunicados */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-gray-500" />
                  <CardTitle className="text-base font-medium">Comunicados</CardTitle>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Bell className="w-4 h-4 text-amber-500" />
                  <span className="text-amber-600 font-medium">{naoLidos} não lidos</span>
                  <span className="text-gray-400">|</span>
                  <span className="text-gray-500">{comunicados.length} total</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-400">Não foi possível carregar os comunicados</div>
              </CardContent>
            </Card>

            {/* Fila de Trabalho */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <CardTitle className="text-base font-medium">Fila de Trabalho</CardTitle>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-amber-500" />
                    <span className="text-amber-600 font-medium">{pendentes} pendentes</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-green-600 font-medium">{concluidas} concluídas</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left text-xs font-medium text-gray-500 uppercase px-4 py-2">Tipo</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase px-4 py-2">Título</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase px-4 py-2">Solicitante</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase px-4 py-2">Valor</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase px-4 py-2">Prazo</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase px-4 py-2">Prioridade</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase px-4 py-2">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filaTarefas.map((tarefa) => {
                      const Icon = getTipoIcon(tarefa.tipo)
                      return (
                        <tr key={tarefa.id} className="border-b border-gray-50 hover:bg-gray-50">
                          <td className="px-4 py-3">
                            <Icon className="w-4 h-4 text-gray-400" />
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-sm font-medium text-gray-900">{tarefa.titulo}</span>
                          </td>
                          <td className="px-4 py-3">
                            <div>
                              <span className="text-sm text-gray-900">{tarefa.solicitante}</span>
                              <p className="text-xs text-gray-500">{tarefa.departamento}</p>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-sm text-gray-900">{tarefa.valor}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-sm text-gray-900">{tarefa.prazo}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={cn(
                                "text-xs px-2 py-1 rounded font-medium",
                                getPrioridadeStyle(tarefa.prioridade),
                              )}
                            >
                              {tarefa.prioridade}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                                <Eye className="w-4 h-4 text-gray-400" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                                <Check className="w-4 h-4 text-green-500" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                                <X className="w-4 h-4 text-red-500" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>

          {/* Coluna direita - Calendário */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Marcos e eventos da obra</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Navegação do mês */}
                <div className="flex items-center justify-between">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setMesAtual(new Date(mesAtual.getFullYear(), mesAtual.getMonth() - 1, 1))}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <span className="text-sm font-medium capitalize">{nomeMes}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setMesAtual(new Date(mesAtual.getFullYear(), mesAtual.getMonth() + 1, 1))}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>

                {/* Calendário */}
                <div className="grid grid-cols-7 gap-1 text-center">
                  {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((dia) => (
                    <div key={dia} className="text-xs font-medium text-gray-500 py-1">
                      {dia}
                    </div>
                  ))}
                  {diasCalendario.map((dia, index) => (
                    <div
                      key={index}
                      className={cn(
                        "text-sm py-1.5 rounded",
                        dia === 14 && "bg-amber-600 text-white font-medium",
                        dia && dia !== 14 && "hover:bg-gray-100 cursor-pointer",
                        !dia && "invisible",
                      )}
                    >
                      {dia}
                    </div>
                  ))}
                </div>

                {/* Marcos do mês */}
                <div className="pt-4 border-t border-gray-100">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase mb-3">Marcos do Mês</h4>
                  <div className="space-y-2">
                    {marcosDoMes.slice(0, 1).map((marco) => (
                      <div key={marco.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div className="flex items-center gap-2">
                          <div className={cn("w-2 h-2 rounded-full", getMarcoCor(marco.tipo))} />
                          <span className="text-sm font-medium text-gray-900">{marco.nome}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">{marco.data}</span>
                          <Button variant="outline" size="sm" className="h-6 text-xs bg-transparent">
                            Concluir
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Próximos marcos */}
                <div className="pt-2">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase mb-3">Próximos Marcos</h4>
                  <div className="space-y-2">
                    {marcosDoMes.map((marco) => (
                      <div key={marco.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={cn("w-2 h-2 rounded-full", getMarcoCor(marco.tipo))} />
                          <span className="text-sm text-gray-700">{marco.nome}</span>
                        </div>
                        <span className="text-xs text-gray-500">{marco.data}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Legenda */}
                <div className="pt-4 border-t border-gray-100">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Legenda</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-orange-500" />
                      <span className="text-gray-600">Marco</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span className="text-gray-600">Medição</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      <span className="text-gray-600">Entrega</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-purple-500" />
                      <span className="text-gray-600">Reunião</span>
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
