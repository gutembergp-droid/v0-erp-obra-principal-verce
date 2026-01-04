"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Video, Users, MoreVertical, Plus, Calendar, Clock, Link2, FileText, Play, ChevronRight } from "lucide-react"

const upcomingMeetings = [
  {
    id: 1,
    title: "Reuniao de Alinhamento - BR-101",
    time: "14:00",
    date: "Hoje",
    participants: ["CM", "AP", "RS"],
    duration: "1h",
  },
  {
    id: 2,
    title: "Call com DNIT - Medicao #01",
    time: "16:00",
    date: "Hoje",
    participants: ["CM", "JL"],
    duration: "30min",
  },
  {
    id: 3,
    title: "Revisao Cronograma Semanal",
    time: "09:00",
    date: "Amanha",
    participants: ["CM", "AP", "RS", "ML", "PA"],
    duration: "2h",
  },
  {
    id: 4,
    title: "Kickoff Fase 2 - Engenharia",
    time: "14:00",
    date: "16/01",
    participants: ["CM", "EL", "PA"],
    duration: "1h30",
  },
]

const recentRecordings = [
  { id: 1, title: "Reuniao de Alinhamento - 10/01", duration: "58:32", date: "10/01/2025", size: "245 MB" },
  { id: 2, title: "Call com Cliente SABESP", duration: "32:15", date: "09/01/2025", size: "128 MB" },
  { id: 3, title: "Revisao Tecnica - Projetos", duration: "1:24:05", date: "08/01/2025", size: "412 MB" },
]

const meetingTemplates = [
  { id: 1, title: "Reuniao de Alinhamento", icon: "sync", description: "Template padrao para alinhamentos de equipe" },
  { id: 2, title: "Revisao de Projeto", icon: "file", description: "Revisao tecnica com compartilhamento de tela" },
  { id: 3, title: "Kickoff de Fase", icon: "rocket", description: "Inicio de nova fase do projeto" },
  { id: 4, title: "Reuniao com Cliente", icon: "users", description: "Reuniao externa com cliente" },
]

export function MeetingModule() {
  const [isInMeeting, setIsInMeeting] = useState(false)
  const [videoOn, setVideoOn] = useState(true)
  const [micOn, setMicOn] = useState(true)
  const [screenShare, setScreenShare] = useState(false)
  const [isRecording, setIsRecording] = useState(false)

  return (
    <div className="h-[calc(100vh-220px)] flex gap-4">
      {/* Painel Principal */}
      <div className="flex-1 flex flex-col gap-4">
        {/* Iniciar Reuniao */}
        <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-1">Iniciar Reuniao</h2>
              <p className="text-sm text-muted-foreground">Crie uma nova reuniao ou entre com um codigo</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-2 bg-muted/50 rounded-xl">
                <Link2 className="w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Cole o link da reuniao"
                  className="w-64 border-0 bg-transparent focus-visible:ring-0 h-8 px-0"
                />
              </div>
              <Button variant="outline" className="h-10 px-4 rounded-xl border-border/50 bg-transparent">
                Entrar
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <Button
              className="h-24 flex-col gap-2 rounded-xl bg-primary hover:bg-primary/90"
              onClick={() => setIsInMeeting(true)}
            >
              <Video className="w-6 h-6" />
              <span>Nova Reuniao</span>
            </Button>
            <Button
              variant="outline"
              className="h-24 flex-col gap-2 rounded-xl border-border/50 hover:bg-muted/50 bg-transparent"
            >
              <Calendar className="w-6 h-6" />
              <span>Agendar</span>
            </Button>
            <Button
              variant="outline"
              className="h-24 flex-col gap-2 rounded-xl border-border/50 hover:bg-muted/50 bg-transparent"
            >
              <FileText className="w-6 h-6" />
              <span>Criar Ata</span>
            </Button>
            <Button
              variant="outline"
              className="h-24 flex-col gap-2 rounded-xl border-border/50 hover:bg-muted/50 bg-transparent"
            >
              <Users className="w-6 h-6" />
              <span>Sala de Espera</span>
            </Button>
          </div>
        </Card>

        {/* Templates de Reuniao */}
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
          <div className="p-4 border-b border-border/50">
            <h3 className="font-semibold text-foreground">Templates de Reuniao</h3>
          </div>
          <div className="p-4 grid grid-cols-2 gap-3">
            {meetingTemplates.map((template) => (
              <button
                key={template.id}
                className="flex items-center gap-4 p-4 rounded-xl bg-muted/20 border border-border/50 hover:border-primary/30 transition-all text-left"
              >
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Video className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm text-foreground">{template.title}</h4>
                  <p className="text-xs text-muted-foreground">{template.description}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </button>
            ))}
          </div>
        </Card>

        {/* Gravacoes Recentes */}
        <Card className="flex-1 border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
          <div className="p-4 border-b border-border/50 flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Gravacoes Recentes</h3>
            <Button size="sm" variant="ghost" className="h-8 text-primary hover:bg-primary/10">
              Ver todas
            </Button>
          </div>
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-2">
              {recentRecordings.map((rec) => (
                <div
                  key={rec.id}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/30 transition-all cursor-pointer group"
                >
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Play className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm text-foreground truncate">{rec.title}</h4>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{rec.date}</span>
                      <span>{rec.duration}</span>
                      <span>{rec.size}</span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <FileText className="w-4 h-4 mr-1" />
                    Ata
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>
      </div>

      {/* Sidebar - Proximas Reunioes */}
      <Card className="w-80 border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
        <div className="p-4 border-b border-border/50 flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Proximas Reunioes</h3>
          <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg hover:bg-primary/10">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-3">
            {upcomingMeetings.map((meeting) => (
              <div
                key={meeting.id}
                className="p-4 rounded-xl bg-muted/20 border border-border/50 hover:border-primary/30 transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <Badge variant="outline" className="text-xs bg-muted/50 border-border/50">
                    {meeting.date}
                  </Badge>
                  <Button size="icon" variant="ghost" className="h-6 w-6 -mr-1 -mt-1">
                    <MoreVertical className="w-3 h-3" />
                  </Button>
                </div>
                <h4 className="font-medium text-sm text-foreground mb-2">{meeting.title}</h4>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{meeting.time}</span>
                    <span className="text-muted-foreground/50">|</span>
                    <span>{meeting.duration}</span>
                  </div>
                  <div className="flex -space-x-2">
                    {meeting.participants.slice(0, 3).map((p, i) => (
                      <Avatar key={i} className="h-6 w-6 border-2 border-card">
                        <AvatarFallback className="text-[10px] bg-muted">{p}</AvatarFallback>
                      </Avatar>
                    ))}
                    {meeting.participants.length > 3 && (
                      <div className="h-6 w-6 rounded-full bg-muted border-2 border-card flex items-center justify-center text-[10px] text-muted-foreground">
                        +{meeting.participants.length - 3}
                      </div>
                    )}
                  </div>
                </div>
                <Button size="sm" className="w-full mt-3 h-8 rounded-lg bg-primary/10 text-primary hover:bg-primary/20">
                  <Video className="w-3 h-3 mr-2" />
                  Entrar
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </Card>
    </div>
  )
}
