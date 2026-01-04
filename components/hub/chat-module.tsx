"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Search,
  Plus,
  Send,
  Paperclip,
  Smile,
  Video,
  Phone,
  MoreVertical,
  Hash,
  Users,
  Pin,
  FileText,
  Mic,
} from "lucide-react"

const conversations = [
  {
    id: 1,
    name: "Equipe BR-101",
    type: "group",
    lastMessage: "Carlos: Anexei o relatório...",
    time: "10:45",
    unread: 3,
    pinned: true,
  },
  {
    id: 2,
    name: "Ana Paula Costa",
    type: "direct",
    lastMessage: "Ok, vou verificar agora",
    time: "10:30",
    unread: 0,
    online: true,
  },
  { id: 3, name: "Comercial Geral", type: "channel", lastMessage: "Nova medicao aprovada", time: "09:15", unread: 12 },
  {
    id: 4,
    name: "Roberto Silva",
    type: "direct",
    lastMessage: "Reuniao confirmada para 14h",
    time: "Ontem",
    unread: 0,
    online: false,
  },
  {
    id: 5,
    name: "Engenharia - Projetos",
    type: "channel",
    lastMessage: "Revisao P-2024-089 disponivel",
    time: "Ontem",
    unread: 5,
  },
  { id: 6, name: "SSMA Alertas", type: "channel", lastMessage: "DDS realizado com sucesso", time: "Seg", unread: 0 },
]

const messages = [
  {
    id: 1,
    sender: "Carlos Mendes",
    avatar: "CM",
    time: "10:30",
    content: "Bom dia equipe! Seguem os documentos atualizados do projeto.",
    isMe: false,
  },
  {
    id: 2,
    sender: "Carlos Mendes",
    avatar: "CM",
    time: "10:31",
    content: "",
    isMe: false,
    attachment: { type: "file", name: "Relatorio_Medicao_Jan2025.pdf", size: "2.4 MB" },
  },
  {
    id: 3,
    sender: "Voce",
    avatar: "AD",
    time: "10:35",
    content: "Recebido Carlos! Vou analisar e retorno em breve.",
    isMe: true,
  },
  {
    id: 4,
    sender: "Ana Paula Costa",
    avatar: "AP",
    time: "10:38",
    content: "Excelente! Ja estou revisando os valores.",
    isMe: false,
  },
  {
    id: 5,
    sender: "Roberto Silva",
    avatar: "RS",
    time: "10:42",
    content: "Precisamos agendar uma call para alinhar os proximos passos. Que tal hoje as 14h?",
    isMe: false,
  },
  {
    id: 6,
    sender: "Voce",
    avatar: "AD",
    time: "10:45",
    content: "Perfeito Roberto, 14h funciona para mim. Vou criar a reuniao.",
    isMe: true,
  },
]

export function ChatModule() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0])
  const [messageInput, setMessageInput] = useState("")

  return (
    <div className="h-[calc(100vh-220px)] flex gap-4">
      {/* Sidebar de Conversas */}
      <Card className="w-80 flex flex-col border-border/50 bg-card/50 backdrop-blur-sm">
        {/* Header */}
        <div className="p-4 border-b border-border/50">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-foreground">Conversas</h2>
            <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg hover:bg-primary/10">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar conversas..."
              className="pl-9 bg-background/50 border-border/50 rounded-lg h-9"
            />
          </div>
        </div>

        {/* Lista de Conversas */}
        <ScrollArea className="flex-1">
          <div className="p-2">
            {/* Fixados */}
            <div className="mb-2">
              <span className="text-xs text-muted-foreground px-2 font-medium">FIXADOS</span>
            </div>
            {conversations
              .filter((c) => c.pinned)
              .map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                    selectedConversation.id === conv.id ? "bg-primary/10 border border-primary/20" : "hover:bg-muted/50"
                  }`}
                >
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary/10 text-primary text-sm">
                        {conv.type === "channel" ? (
                          <Hash className="w-4 h-4" />
                        ) : (
                          conv.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)
                        )}
                      </AvatarFallback>
                    </Avatar>
                    {conv.online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-card rounded-full"></span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm text-foreground truncate">{conv.name}</span>
                      <span className="text-xs text-muted-foreground">{conv.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{conv.lastMessage}</p>
                  </div>
                  {conv.unread > 0 && (
                    <span className="bg-primary text-primary-foreground text-xs font-medium px-2 py-0.5 rounded-full">
                      {conv.unread}
                    </span>
                  )}
                </button>
              ))}

            {/* Recentes */}
            <div className="mb-2 mt-4">
              <span className="text-xs text-muted-foreground px-2 font-medium">RECENTES</span>
            </div>
            {conversations
              .filter((c) => !c.pinned)
              .map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                    selectedConversation.id === conv.id ? "bg-primary/10 border border-primary/20" : "hover:bg-muted/50"
                  }`}
                >
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-muted text-muted-foreground text-sm">
                        {conv.type === "channel" ? (
                          <Hash className="w-4 h-4" />
                        ) : (
                          conv.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)
                        )}
                      </AvatarFallback>
                    </Avatar>
                    {conv.online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-card rounded-full"></span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm text-foreground truncate">{conv.name}</span>
                      <span className="text-xs text-muted-foreground">{conv.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{conv.lastMessage}</p>
                  </div>
                  {conv.unread > 0 && (
                    <span className="bg-primary text-primary-foreground text-xs font-medium px-2 py-0.5 rounded-full">
                      {conv.unread}
                    </span>
                  )}
                </button>
              ))}
          </div>
        </ScrollArea>
      </Card>

      {/* Area Principal do Chat */}
      <Card className="flex-1 flex flex-col border-border/50 bg-card/50 backdrop-blur-sm">
        {/* Header do Chat */}
        <div className="p-4 border-b border-border/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-primary/10 text-primary">
                {selectedConversation.type === "channel" ? (
                  <Hash className="w-4 h-4" />
                ) : (
                  selectedConversation.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)
                )}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-foreground">{selectedConversation.name}</h3>
              <p className="text-xs text-muted-foreground">
                {selectedConversation.type === "group"
                  ? "5 membros"
                  : selectedConversation.type === "channel"
                    ? "Canal"
                    : "Online"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button size="icon" variant="ghost" className="h-9 w-9 rounded-lg hover:bg-primary/10">
              <Phone className="w-4 h-4" />
            </Button>
            <Button size="icon" variant="ghost" className="h-9 w-9 rounded-lg hover:bg-primary/10">
              <Video className="w-4 h-4" />
            </Button>
            <Button size="icon" variant="ghost" className="h-9 w-9 rounded-lg hover:bg-primary/10">
              <Users className="w-4 h-4" />
            </Button>
            <Button size="icon" variant="ghost" className="h-9 w-9 rounded-lg hover:bg-primary/10">
              <Pin className="w-4 h-4" />
            </Button>
            <Button size="icon" variant="ghost" className="h-9 w-9 rounded-lg hover:bg-primary/10">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Mensagens */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-3 ${msg.isMe ? "flex-row-reverse" : ""}`}>
                <Avatar className="h-8 w-8 mt-1">
                  <AvatarFallback className={`text-xs ${msg.isMe ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                    {msg.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className={`max-w-[70%] ${msg.isMe ? "items-end" : "items-start"}`}>
                  <div className="flex items-center gap-2 mb-1">
                    {!msg.isMe && <span className="text-sm font-medium text-foreground">{msg.sender}</span>}
                    <span className="text-xs text-muted-foreground">{msg.time}</span>
                  </div>
                  {msg.content && (
                    <div
                      className={`px-4 py-2.5 rounded-2xl ${
                        msg.isMe
                          ? "bg-primary text-primary-foreground rounded-br-md"
                          : "bg-muted/50 text-foreground rounded-bl-md"
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                    </div>
                  )}
                  {msg.attachment && (
                    <div className="mt-2 flex items-center gap-3 px-4 py-3 bg-muted/30 border border-border/50 rounded-xl">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{msg.attachment.name}</p>
                        <p className="text-xs text-muted-foreground">{msg.attachment.size}</p>
                      </div>
                      <Button size="sm" variant="ghost" className="h-8 px-3 text-primary hover:bg-primary/10">
                        Baixar
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Input de Mensagem */}
        <div className="p-4 border-t border-border/50">
          <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center gap-2 bg-background/50 border border-border/50 rounded-xl px-4 py-2">
              <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg hover:bg-muted">
                <Paperclip className="w-4 h-4 text-muted-foreground" />
              </Button>
              <Input
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Digite sua mensagem..."
                className="flex-1 border-0 bg-transparent focus-visible:ring-0 px-0 h-8"
              />
              <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg hover:bg-muted">
                <Smile className="w-4 h-4 text-muted-foreground" />
              </Button>
              <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg hover:bg-muted">
                <Mic className="w-4 h-4 text-muted-foreground" />
              </Button>
            </div>
            <Button size="icon" className="h-10 w-10 rounded-xl bg-primary hover:bg-primary/90">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
