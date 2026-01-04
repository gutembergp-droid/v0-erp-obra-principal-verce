"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import {
  Bot,
  Send,
  Sparkles,
  FileText,
  BarChart3,
  Calendar,
  Lightbulb,
  Brain,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
  Mic,
} from "lucide-react"

const aiAgents = [
  {
    id: 1,
    name: "Assistente Geral",
    icon: Bot,
    description: "Ajuda com tarefas gerais e perguntas",
    color: "bg-blue-500",
  },
  {
    id: 2,
    name: "Analista de Dados",
    icon: BarChart3,
    description: "Analise de metricas e relatorios",
    color: "bg-emerald-500",
  },
  {
    id: 3,
    name: "Gerador de Atas",
    icon: FileText,
    description: "Cria atas de reuniao automaticamente",
    color: "bg-amber-500",
  },
  { id: 4, name: "Planejador", icon: Calendar, description: "Ajuda com cronogramas e prazos", color: "bg-purple-500" },
]

const suggestions = [
  "Gere um resumo da reuniao de ontem",
  "Analise o progresso das tarefas desta semana",
  "Crie uma ata para a proxima reuniao",
  "Quais sao minhas tarefas prioritarias?",
]

const chatHistory = [
  {
    id: 1,
    role: "user",
    content: "Preciso de um resumo do status atual do projeto BR-101",
  },
  {
    id: 2,
    role: "assistant",
    content: `Aqui esta o resumo do projeto BR-101 - Duplicacao:\n\n**Status Geral:** Em andamento (65% concluido)\n\n**Destaques:**\n- Medicao #01 aprovada: R$ 1.197.000,00\n- Prazo atual: dentro do cronograma\n- 5 tarefas pendentes de aprovacao\n\n**Proximos Marcos:**\n- Inicio da Mobilizacao: 14/01\n- Medicao #02: 04/02\n\n**Alertas:**\n- 2 requisicoes de compra aguardando aprovacao\n- 1 FVS pendente de verificacao`,
    suggestions: ["Ver detalhes das tarefas", "Gerar relatorio completo", "Agendar reuniao de status"],
  },
]

export function AIAssistantModule() {
  const [selectedAgent, setSelectedAgent] = useState(aiAgents[0])
  const [inputMessage, setInputMessage] = useState("")
  const [messages, setMessages] = useState(chatHistory)

  return (
    <div className="h-[calc(100vh-220px)] flex gap-4">
      {/* Sidebar - Agentes */}
      <Card className="w-72 border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
        <div className="p-4 border-b border-border/50">
          <h3 className="font-semibold text-foreground mb-1">Agentes IA</h3>
          <p className="text-xs text-muted-foreground">Selecione um agente especializado</p>
        </div>
        <ScrollArea className="flex-1 p-3">
          <div className="space-y-2">
            {aiAgents.map((agent) => (
              <button
                key={agent.id}
                onClick={() => setSelectedAgent(agent)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left ${
                  selectedAgent.id === agent.id
                    ? "bg-primary/10 border border-primary/30"
                    : "hover:bg-muted/50 border border-transparent"
                }`}
              >
                <div className={`p-2 rounded-xl ${agent.color}/10`}>
                  <agent.icon className={`w-5 h-5 ${agent.color.replace("bg-", "text-")}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm text-foreground">{agent.name}</h4>
                  <p className="text-xs text-muted-foreground truncate">{agent.description}</p>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>

        {/* Capacidades do Agente */}
        <div className="p-4 border-t border-border/50">
          <h4 className="text-xs font-medium text-muted-foreground mb-3">CAPACIDADES</h4>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="text-xs bg-muted/30 border-border/50">
              <Sparkles className="w-3 h-3 mr-1" />
              Analise
            </Badge>
            <Badge variant="outline" className="text-xs bg-muted/30 border-border/50">
              <FileText className="w-3 h-3 mr-1" />
              Documentos
            </Badge>
            <Badge variant="outline" className="text-xs bg-muted/30 border-border/50">
              <Brain className="w-3 h-3 mr-1" />
              Insights
            </Badge>
          </div>
        </div>
      </Card>

      {/* Area Principal do Chat */}
      <Card className="flex-1 flex flex-col border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-border/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${selectedAgent.color}/10`}>
              <selectedAgent.icon className={`w-5 h-5 ${selectedAgent.color.replace("bg-", "text-")}`} />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{selectedAgent.name}</h3>
              <p className="text-xs text-muted-foreground">{selectedAgent.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" className="h-8 rounded-lg border-border/50 bg-transparent">
              <RefreshCw className="w-4 h-4 mr-1" />
              Nova Conversa
            </Button>
          </div>
        </div>

        {/* Mensagens */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-6">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full py-12">
                <div className="p-4 bg-primary/10 rounded-2xl mb-4">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Como posso ajudar?</h3>
                <p className="text-sm text-muted-foreground text-center max-w-md mb-6">
                  Sou o {selectedAgent.name}. Posso ajudar com analises, criar documentos, gerar insights e muito mais.
                </p>
                <div className="grid grid-cols-2 gap-3 w-full max-w-lg">
                  {suggestions.map((suggestion, i) => (
                    <button
                      key={i}
                      onClick={() => setInputMessage(suggestion)}
                      className="flex items-center gap-2 p-3 rounded-xl bg-muted/30 border border-border/50 hover:border-primary/30 transition-all text-left text-sm text-foreground"
                    >
                      <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((msg) => (
                <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                  <Avatar className="h-8 w-8 mt-1 shrink-0">
                    <AvatarFallback
                      className={`text-xs ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : `${selectedAgent.color}/20 ${selectedAgent.color.replace("bg-", "text-")}`
                      }`}
                    >
                      {msg.role === "user" ? "VC" : <Bot className="w-4 h-4" />}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`max-w-[80%] ${msg.role === "user" ? "items-end" : "items-start"}`}>
                    <div
                      className={`px-4 py-3 rounded-2xl ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground rounded-br-md"
                          : "bg-muted/30 border border-border/50 text-foreground rounded-bl-md"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">{msg.content}</p>
                    </div>
                    {msg.role === "assistant" && (
                      <div className="mt-2 flex items-center gap-2">
                        <Button size="icon" variant="ghost" className="h-7 w-7 rounded-lg hover:bg-muted">
                          <Copy className="w-3 h-3" />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-7 w-7 rounded-lg hover:bg-muted">
                          <ThumbsUp className="w-3 h-3" />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-7 w-7 rounded-lg hover:bg-muted">
                          <ThumbsDown className="w-3 h-3" />
                        </Button>
                      </div>
                    )}
                    {msg.suggestions && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {msg.suggestions.map((sug, i) => (
                          <Button
                            key={i}
                            size="sm"
                            variant="outline"
                            className="h-7 text-xs rounded-lg border-border/50 hover:bg-primary/10 hover:border-primary/30 bg-transparent"
                            onClick={() => setInputMessage(sug)}
                          >
                            {sug}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="p-4 border-t border-border/50">
          <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center gap-2 bg-background/50 border border-border/50 rounded-xl px-4 py-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={`Pergunte ao ${selectedAgent.name}...`}
                className="flex-1 border-0 bg-transparent focus-visible:ring-0 px-0 h-8"
              />
              <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg hover:bg-muted">
                <Mic className="w-4 h-4 text-muted-foreground" />
              </Button>
            </div>
            <Button size="icon" className="h-10 w-10 rounded-xl bg-primary hover:bg-primary/90">
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-2">
            O assistente pode cometer erros. Verifique informacoes importantes.
          </p>
        </div>
      </Card>
    </div>
  )
}
