"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  Users,
  MoreHorizontal,
  CheckCircle2,
  Circle,
  Filter,
  LayoutGrid,
  List,
  CalendarIcon,
} from "lucide-react"

const tasks = [
  {
    id: 1,
    title: "Revisar BDI - Duplicacao BR-101",
    priority: "alta",
    status: "em_andamento",
    dueDate: "14/01",
    assignee: "Carlos M.",
    category: "Comercial",
    progress: 65,
  },
  {
    id: 2,
    title: "Aprovacao Requisicao Aco CA-50",
    priority: "urgente",
    status: "pendente",
    dueDate: "14/01",
    assignee: "Roberto S.",
    category: "Suprimentos",
    progress: 0,
  },
  {
    id: 3,
    title: "Medicao #01 - Mobilizacao",
    priority: "alta",
    status: "em_andamento",
    dueDate: "15/01",
    assignee: "Ana Paula",
    category: "Comercial",
    progress: 80,
  },
  {
    id: 4,
    title: "Revisao Contrato - Aditivo Prazo",
    priority: "media",
    status: "concluida",
    dueDate: "13/01",
    assignee: "Mariana L.",
    category: "Juridico",
    progress: 100,
  },
  {
    id: 5,
    title: "DDS Semanal - Trabalho em Altura",
    priority: "media",
    status: "pendente",
    dueDate: "16/01",
    assignee: "Pedro A.",
    category: "SSMA",
    progress: 0,
  },
  {
    id: 6,
    title: "Compatibilizacao Projetos Fase 2",
    priority: "alta",
    status: "em_andamento",
    dueDate: "17/01",
    assignee: "Eng. Lucas",
    category: "Engenharia",
    progress: 45,
  },
]

const events = [
  { id: 1, title: "Reuniao de Alinhamento", time: "09:00 - 10:00", type: "meeting", participants: 5 },
  { id: 2, title: "Call com Cliente DNIT", time: "14:00 - 15:00", type: "call", participants: 3 },
  { id: 3, title: "Revisao de Cronograma", time: "16:00 - 17:00", type: "meeting", participants: 4 },
]

const daysOfWeek = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"]
const currentMonth = "Janeiro 2025"

export function CalendarModule() {
  const [view, setView] = useState<"board" | "list" | "calendar">("board")
  const [selectedDay, setSelectedDay] = useState(14)

  const generateCalendarDays = () => {
    const days = []
    for (let i = 1; i <= 31; i++) {
      days.push({
        day: i,
        hasEvent: [5, 10, 14, 15, 17, 22, 28].includes(i),
        isToday: i === 14,
      })
    }
    return days
  }

  const calendarDays = generateCalendarDays()

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgente":
        return "bg-red-500/10 text-red-600 border-red-500/20"
      case "alta":
        return "bg-amber-500/10 text-amber-600 border-amber-500/20"
      case "media":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "concluida":
        return <CheckCircle2 className="w-4 h-4 text-emerald-500" />
      case "em_andamento":
        return <Clock className="w-4 h-4 text-amber-500" />
      case "pendente":
        return <Circle className="w-4 h-4 text-muted-foreground" />
      default:
        return <Circle className="w-4 h-4" />
    }
  }

  return (
    <div className="h-[calc(100vh-220px)] flex gap-4">
      {/* Painel Esquerdo - Calendario e Eventos do Dia */}
      <div className="w-80 flex flex-col gap-4">
        {/* Mini Calendario */}
        <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">{currentMonth}</h3>
            <div className="flex items-center gap-1">
              <Button size="icon" variant="ghost" className="h-7 w-7 rounded-lg">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="ghost" className="h-7 w-7 rounded-lg">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {daysOfWeek.map((day) => (
              <span key={day} className="text-xs text-muted-foreground text-center font-medium py-1">
                {day}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {/* Offset para comecar no dia certo */}
            {[...Array(3)].map((_, i) => (
              <div key={`offset-${i}`} className="h-8" />
            ))}
            {calendarDays.map(({ day, hasEvent, isToday }) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`h-8 w-8 rounded-lg text-sm flex items-center justify-center relative transition-all ${
                  selectedDay === day
                    ? "bg-primary text-primary-foreground font-medium"
                    : isToday
                      ? "bg-primary/10 text-primary font-medium"
                      : "hover:bg-muted text-foreground"
                }`}
              >
                {day}
                {hasEvent && selectedDay !== day && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></span>
                )}
              </button>
            ))}
          </div>
        </Card>

        {/* Eventos do Dia */}
        <Card className="flex-1 border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
          <div className="p-4 border-b border-border/50">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Hoje, 14 Jan</h3>
              <Button size="sm" variant="ghost" className="h-7 px-2 text-primary hover:bg-primary/10">
                <Plus className="w-4 h-4 mr-1" />
                Evento
              </Button>
            </div>
          </div>
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-3">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="p-3 rounded-xl bg-muted/30 border border-border/50 hover:border-primary/30 transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-sm text-foreground">{event.title}</h4>
                    <Button size="icon" variant="ghost" className="h-6 w-6 -mr-1 -mt-1">
                      <MoreHorizontal className="w-3 h-3" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {event.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {event.participants}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>
      </div>

      {/* Painel Principal - Tarefas */}
      <Card className="flex-1 border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="font-semibold text-foreground">Minhas Tarefas</h2>
              <div className="flex items-center gap-1 bg-muted/50 rounded-lg p-1">
                <Button
                  size="sm"
                  variant={view === "board" ? "default" : "ghost"}
                  className={`h-7 px-3 rounded-md ${view === "board" ? "bg-primary" : ""}`}
                  onClick={() => setView("board")}
                >
                  <LayoutGrid className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant={view === "list" ? "default" : "ghost"}
                  className={`h-7 px-3 rounded-md ${view === "list" ? "bg-primary" : ""}`}
                  onClick={() => setView("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant={view === "calendar" ? "default" : "ghost"}
                  className={`h-7 px-3 rounded-md ${view === "calendar" ? "bg-primary" : ""}`}
                  onClick={() => setView("calendar")}
                >
                  <CalendarIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" className="h-8 gap-2 rounded-lg border-border/50 bg-transparent">
                <Filter className="w-4 h-4" />
                Filtrar
              </Button>
              <Button size="sm" className="h-8 gap-2 rounded-lg bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4" />
                Nova Tarefa
              </Button>
            </div>
          </div>
        </div>

        {/* Lista de Tarefas */}
        <ScrollArea className="flex-1 p-4">
          {view === "list" ? (
            <div className="space-y-2">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center gap-4 p-4 rounded-xl bg-muted/20 border border-border/50 hover:border-primary/30 transition-all cursor-pointer group"
                >
                  <div className="cursor-pointer">{getStatusIcon(task.status)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4
                        className={`font-medium text-sm ${task.status === "concluida" ? "text-muted-foreground line-through" : "text-foreground"}`}
                      >
                        {task.title}
                      </h4>
                      <Badge variant="outline" className={`text-xs px-2 py-0 h-5 ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{task.category}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {task.dueDate}
                      </span>
                      <span>{task.assignee}</span>
                    </div>
                  </div>
                  {task.progress > 0 && task.progress < 100 && (
                    <div className="w-24">
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all"
                          style={{ width: `${task.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">{task.progress}%</span>
                    </div>
                  )}
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {/* Coluna Pendente */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 bg-muted-foreground rounded-full"></span>
                  <h3 className="font-medium text-sm text-foreground">Pendente</h3>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                    {tasks.filter((t) => t.status === "pendente").length}
                  </span>
                </div>
                {tasks
                  .filter((t) => t.status === "pendente")
                  .map((task) => (
                    <Card
                      key={task.id}
                      className="p-4 border-border/50 hover:border-primary/30 transition-all cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <Badge variant="outline" className={`text-xs px-2 py-0 h-5 ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </Badge>
                        <Button size="icon" variant="ghost" className="h-6 w-6 -mr-2 -mt-1">
                          <MoreHorizontal className="w-3 h-3" />
                        </Button>
                      </div>
                      <h4 className="font-medium text-sm text-foreground mb-2">{task.title}</h4>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {task.dueDate}
                        </span>
                        <span className="px-2 py-0.5 bg-muted rounded text-xs">{task.category}</span>
                      </div>
                    </Card>
                  ))}
              </div>

              {/* Coluna Em Andamento */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                  <h3 className="font-medium text-sm text-foreground">Em Andamento</h3>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                    {tasks.filter((t) => t.status === "em_andamento").length}
                  </span>
                </div>
                {tasks
                  .filter((t) => t.status === "em_andamento")
                  .map((task) => (
                    <Card
                      key={task.id}
                      className="p-4 border-border/50 hover:border-primary/30 transition-all cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <Badge variant="outline" className={`text-xs px-2 py-0 h-5 ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </Badge>
                        <Button size="icon" variant="ghost" className="h-6 w-6 -mr-2 -mt-1">
                          <MoreHorizontal className="w-3 h-3" />
                        </Button>
                      </div>
                      <h4 className="font-medium text-sm text-foreground mb-2">{task.title}</h4>
                      <div className="mb-2">
                        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-amber-500 rounded-full transition-all"
                            style={{ width: `${task.progress}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {task.dueDate}
                        </span>
                        <span className="px-2 py-0.5 bg-muted rounded text-xs">{task.category}</span>
                      </div>
                    </Card>
                  ))}
              </div>

              {/* Coluna Concluida */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                  <h3 className="font-medium text-sm text-foreground">Concluida</h3>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                    {tasks.filter((t) => t.status === "concluida").length}
                  </span>
                </div>
                {tasks
                  .filter((t) => t.status === "concluida")
                  .map((task) => (
                    <Card key={task.id} className="p-4 border-border/50 opacity-75">
                      <div className="flex items-start justify-between mb-2">
                        <Badge
                          variant="outline"
                          className="text-xs px-2 py-0 h-5 bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                        >
                          concluida
                        </Badge>
                        <Button size="icon" variant="ghost" className="h-6 w-6 -mr-2 -mt-1">
                          <MoreHorizontal className="w-3 h-3" />
                        </Button>
                      </div>
                      <h4 className="font-medium text-sm text-muted-foreground line-through mb-2">{task.title}</h4>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                          {task.dueDate}
                        </span>
                        <span className="px-2 py-0.5 bg-muted rounded text-xs">{task.category}</span>
                      </div>
                    </Card>
                  ))}
              </div>
            </div>
          )}
        </ScrollArea>
      </Card>
    </div>
  )
}
