"use client"

import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Cog, ThumbsUp, ThumbsDown, MessageSquare, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react"
import { InfoTooltip } from "@/components/ui/info-tooltip"

const feedbacksRecentes = [
  {
    id: 1,
    agente: "PLUTO",
    decisao: "Aprovacao automatica medicao #22",
    feedback: "positivo",
    usuario: "Carlos Silva",
    data: "04/01/2026",
    comentario: "Decisao correta, valores conferem",
  },
  {
    id: 2,
    agente: "ATENA",
    decisao: "Sugestao de realocacao de equipe",
    feedback: "negativo",
    usuario: "Maria Santos",
    data: "03/01/2026",
    comentario: "Nao considerou restricoes de transporte",
  },
  {
    id: 3,
    agente: "TEMIS",
    decisao: "Bloqueio de acesso usuario nivel 2",
    feedback: "positivo",
    usuario: "Ana Oliveira",
    data: "02/01/2026",
    comentario: "Identificou tentativa de acesso indevido",
  },
]

const calibragens = [
  {
    agente: "PLUTO",
    parametro: "Limite aprovacao automatica",
    valorAtual: "R$ 50k",
    novoValor: "R$ 75k",
    status: "pendente",
  },
  { agente: "ATENA", parametro: "Peso restricao logistica", valorAtual: "0.3", novoValor: "0.5", status: "aplicado" },
  { agente: "HEFESTO", parametro: "Tolerancia produtividade", valorAtual: "85%", novoValor: "80%", status: "pendente" },
]

const metricas = [
  { label: "Feedbacks Positivos", valor: "89%", icon: ThumbsUp },
  { label: "Calibragens Pendentes", valor: "2", icon: Cog },
  { label: "Precisao Media", valor: "94.2%", icon: TrendingUp },
]

function FeedbackContent() {
  return (
    <div className="flex flex-col h-full overflow-auto">
      {/* Header */}
      <div className="px-6 pt-6 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">Feedback & Calibragem</h1>
            <InfoTooltip
              title="Feedback & Calibragem"
              description="Sistema de feedback para aprimoramento dos agentes de IA. Avalie decisoes e solicite ajustes de parametros."
            />
          </div>
          <Button>
            <MessageSquare className="w-4 h-4 mr-2" />
            Enviar Feedback
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mt-1">Aprimoramento continuo dos agentes da obra</p>
      </div>

      <div className="p-6 space-y-6 flex-1">
        {/* Metricas */}
        <div className="grid grid-cols-3 gap-4">
          {metricas.map((metrica) => (
            <Card key={metrica.label}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">{metrica.label}</p>
                    <p className="text-2xl font-bold">{metrica.valor}</p>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <metrica.icon className="w-5 h-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Conteudo */}
        <div className="grid grid-cols-2 gap-6">
          {/* Feedbacks Recentes */}
          <Card className="flex flex-col">
            <CardHeader className="py-3 flex-shrink-0">
              <CardTitle className="text-base">Feedbacks Recentes</CardTitle>
              <CardDescription>Avaliacoes de decisoes dos agentes</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <ScrollArea className="h-[300px]">
                <div className="space-y-3">
                  {feedbacksRecentes.map((feedback) => (
                    <div
                      key={feedback.id}
                      className={`p-3 rounded-lg border ${
                        feedback.feedback === "positivo"
                          ? "border-primary/30 bg-primary/5"
                          : "border-destructive/30 bg-destructive/5"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{feedback.agente}</Badge>
                          {feedback.feedback === "positivo" ? (
                            <ThumbsUp className="w-4 h-4 text-primary" />
                          ) : (
                            <ThumbsDown className="w-4 h-4 text-destructive" />
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground">{feedback.data}</span>
                      </div>
                      <p className="text-sm font-medium mb-1">{feedback.decisao}</p>
                      <p className="text-xs text-muted-foreground">{feedback.comentario}</p>
                      <p className="text-xs text-muted-foreground mt-2">Por: {feedback.usuario}</p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Calibragens */}
          <Card className="flex flex-col">
            <CardHeader className="py-3 flex-shrink-0">
              <CardTitle className="text-base">Calibragens de Parametros</CardTitle>
              <CardDescription>Ajustes solicitados nos agentes</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <ScrollArea className="h-[300px]">
                <div className="space-y-3">
                  {calibragens.map((calibragem, index) => (
                    <div key={index} className="p-3 rounded-lg border">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">{calibragem.agente}</Badge>
                        <Badge
                          variant={calibragem.status === "aplicado" ? "default" : "secondary"}
                          className={calibragem.status === "aplicado" ? "bg-primary/20 text-primary" : ""}
                        >
                          {calibragem.status === "aplicado" ? (
                            <>
                              <CheckCircle className="w-3 h-3 mr-1" /> Aplicado
                            </>
                          ) : (
                            <>
                              <AlertTriangle className="w-3 h-3 mr-1" /> Pendente
                            </>
                          )}
                        </Badge>
                      </div>
                      <p className="text-sm font-medium mb-2">{calibragem.parametro}</p>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-muted-foreground">{calibragem.valorAtual}</span>
                        <span className="text-muted-foreground">→</span>
                        <span className="font-medium text-primary">{calibragem.novoValor}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default function FeedbackPage() {
  return (
    <Suspense fallback={null}>
      <FeedbackContent />
    </Suspense>
  )
}
