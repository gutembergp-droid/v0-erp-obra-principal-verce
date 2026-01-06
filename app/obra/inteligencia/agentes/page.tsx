"use client"

import { useState, Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bot, Activity, Send, Sparkles } from "lucide-react"
import { InfoTooltip } from "@/components/ui/info-tooltip"

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

function AgentesContent() {
  const [mensagem, setMensagem] = useState("")
  const [agenteSelecionado, setAgenteSelecionado] = useState(agentesObra[0])

  return (
    <div className="flex flex-col h-full overflow-auto">
      {/* Header */}
      <div className="px-6 pt-6 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">Agentes da Obra</h1>
            <InfoTooltip
              title="Agentes da Obra"
              description="Instancias locais dos agentes de IA dedicadas a esta obra. Interaja diretamente com PLUTO, HEFESTO e TEMIS."
            />
          </div>
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
            <Activity className="w-3 h-3 mr-1 animate-pulse" />3 Agentes Online
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mt-1">BR-101 LOTE 2 - Agentes dedicados</p>
      </div>

      <div className="p-6 flex-1">
        {/* Conteudo */}
        <div className="grid grid-cols-3 gap-6 h-full">
          {/* Lista de Agentes */}
          <div className="space-y-4">
            {agentesObra.map((agente) => (
              <Card
                key={agente.id}
                className={`cursor-pointer transition-all ${
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
                    <div className="w-2 h-2 rounded-full bg-primary" />
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
            <Card className="h-full flex flex-col">
              <CardHeader className="py-3 flex-shrink-0 border-b">
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
    </div>
  )
}

export default function AgentesObraPage() {
  return (
    <Suspense fallback={null}>
      <AgentesContent />
    </Suspense>
  )
}
