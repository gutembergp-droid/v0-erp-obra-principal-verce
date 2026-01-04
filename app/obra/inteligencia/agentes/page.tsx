"use client"

import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bot, Activity, Send, Sparkles } from "lucide-react"
import { InfoTooltip } from "@/components/ui/info-tooltip"
import { useState } from "react"

const agentesObra = [
  {
    id: "pluto-obra",
    nome: "PLUTO",
    funcao: "Comercial & Financeiro",
    descricao: "Analise de medicoes, custos e margem da obra",
    status: "online",
    tarefasHoje: 45,
    precisao: 96.2,
  },
  {
    id: "hefesto-obra",
    nome: "HEFESTO",
    funcao: "Producao & Campo",
    descricao: "Monitoramento de execucao e produtividade",
    status: "online",
    tarefasHoje: 89,
    precisao: 91.8,
  },
  {
    id: "temis-obra",
    nome: "TEMIS",
    funcao: "Compliance Local",
    descricao: "Validacao de acessos e conformidade na obra",
    status: "online",
    tarefasHoje: 34,
    precisao: 99.1,
  },
]

export default function AgentesObraPage() {
  const [mensagem, setMensagem] = useState("")
  const [agenteSelecionado, setAgenteSelecionado] = useState(agentesObra[0])

  return (
    <AppLayout>
      <div className="flex flex-col h-[calc(100vh-80px)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20">
              <Bot className="w-6 h-6 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-foreground">Agentes da Obra</h1>
                <InfoTooltip
                  title="Agentes da Obra"
                  description="Instancias locais dos agentes de IA dedicadas a esta obra. Interaja diretamente com PLUTO, HEFESTO e TEMIS."
                />
              </div>
              <p className="text-sm text-muted-foreground">BR-101 LOTE 2 - Agentes dedicados</p>
            </div>
          </div>
          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
            <Activity className="w-3 h-3 mr-1 animate-pulse" />3 Agentes Online
          </Badge>
        </div>

        {/* Conteudo */}
        <div className="flex-1 min-h-0 grid grid-cols-3 gap-6">
          {/* Lista de Agentes */}
          <div className="space-y-4">
            {agentesObra.map((agente) => (
              <Card
                key={agente.id}
                className={`border-border/50 cursor-pointer transition-all ${
                  agenteSelecionado.id === agente.id
                    ? "border-primary ring-1 ring-primary/20"
                    : "hover:border-primary/30"
                }`}
                onClick={() => setAgenteSelecionado(agente)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{agente.nome}</h3>
                      <p className="text-xs text-muted-foreground">{agente.funcao}</p>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="p-2 rounded bg-muted/50">
                      <p className="text-sm font-bold">{agente.tarefasHoje}</p>
                      <p className="text-xs text-muted-foreground">Tarefas</p>
                    </div>
                    <div className="p-2 rounded bg-muted/50">
                      <p className="text-sm font-bold">{agente.precisao}%</p>
                      <p className="text-xs text-muted-foreground">Precisao</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Chat com Agente */}
          <div className="col-span-2">
            <Card className="h-full flex flex-col border-border/50">
              <CardHeader className="py-3 flex-shrink-0 border-b border-border/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{agenteSelecionado.nome}</CardTitle>
                    <CardDescription>{agenteSelecionado.descricao}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col min-h-0 p-4">
                <div className="flex-1 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <Bot className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Inicie uma conversa com {agenteSelecionado.nome}</p>
                    <p className="text-sm">Pergunte sobre {agenteSelecionado.funcao.toLowerCase()}</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-4 flex-shrink-0">
                  <input
                    type="text"
                    placeholder={`Pergunte ao ${agenteSelecionado.nome}...`}
                    value={mensagem}
                    onChange={(e) => setMensagem(e.target.value)}
                    className="flex-1 h-10 px-4 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <Button size="icon" className="h-10 w-10">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
