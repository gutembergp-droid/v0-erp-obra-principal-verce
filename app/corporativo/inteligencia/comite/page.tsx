"use client"

import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Users2, CheckCircle, XCircle, Clock, ThumbsUp, ThumbsDown, Calendar, BarChart3 } from "lucide-react"
import { InfoTooltip } from "@/components/ui/info-tooltip"

const validacoesPendentes = [
  {
    id: 1,
    tipo: "Modelo",
    titulo: "ATENA - Estruturacao EAP v2.3",
    descricao: "Novo modelo para estruturacao automatica de EAP baseado em contratos historicos",
    solicitante: "Eng. Carlos Silva",
    data: "04/01/2026",
    prioridade: "alta",
    votos: { favor: 3, contra: 0, abstencao: 1 },
  },
  {
    id: 2,
    tipo: "Decisao",
    titulo: "PLUTO - Limite de Aprovacao Automatica",
    descricao: "Aumentar limite de aprovacao automatica de medicoes de R$ 50k para R$ 100k",
    solicitante: "Ger. Maria Santos",
    data: "03/01/2026",
    prioridade: "media",
    votos: { favor: 2, contra: 1, abstencao: 1 },
  },
  {
    id: 3,
    tipo: "Calibragem",
    titulo: "TEMIS - Ajuste de Sensibilidade",
    descricao: "Recalibragem do nivel de alerta para desvios de compliance",
    solicitante: "Coord. Ana Oliveira",
    data: "02/01/2026",
    prioridade: "baixa",
    votos: { favor: 4, contra: 0, abstencao: 0 },
  },
]

const membrosComite = [
  { id: 1, nome: "Dr. Roberto Lima", cargo: "Diretor de Tecnologia", status: "online" },
  { id: 2, nome: "Eng. Fernanda Costa", cargo: "Gerente de Engenharia", status: "online" },
  { id: 3, nome: "Adm. Paulo Mendes", cargo: "Controladoria", status: "offline" },
  { id: 4, nome: "Dra. Lucia Ferreira", cargo: "Compliance", status: "online" },
  { id: 5, nome: "Eng. Marco Antonio", cargo: "Producao", status: "online" },
]

const metricas = [
  { label: "Validacoes Pendentes", valor: "8", icon: Clock },
  { label: "Aprovadas este Mes", valor: "23", icon: CheckCircle },
  { label: "Rejeitadas", valor: "3", icon: XCircle },
  { label: "Taxa de Aprovacao", valor: "88%", icon: BarChart3 },
]

export default function ComitePage() {
  return (
    <AppLayout>
      <div className="flex flex-col h-[calc(100vh-80px)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/20">
              <Users2 className="w-6 h-6 text-purple-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-foreground">Comite de Validacao</h1>
                <InfoTooltip
                  title="Comite de Validacao"
                  description="Orgao colegiado responsavel por validar novos modelos, decisoes criticas e calibragens dos agentes de IA antes da implementacao em producao."
                />
              </div>
              <p className="text-sm text-muted-foreground">Validacao e aprovacao de modelos e decisoes de IA</p>
            </div>
          </div>
          <Button>
            <Calendar className="w-4 h-4 mr-2" />
            Agendar Reuniao
          </Button>
        </div>

        {/* Metricas */}
        <div className="grid grid-cols-4 gap-4 mb-6 flex-shrink-0">
          {metricas.map((metrica) => (
            <Card key={metrica.label} className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">{metrica.label}</p>
                    <p className="text-2xl font-bold text-foreground">{metrica.valor}</p>
                  </div>
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-purple-500/10">
                    <metrica.icon className="w-5 h-5 text-purple-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Conteudo */}
        <div className="flex-1 min-h-0 grid grid-cols-3 gap-6">
          {/* Validacoes Pendentes */}
          <div className="col-span-2 flex flex-col min-h-0">
            <Card className="flex-1 flex flex-col border-border/50">
              <CardHeader className="flex-shrink-0">
                <CardTitle className="text-base">Validacoes Pendentes</CardTitle>
                <CardDescription>Itens aguardando aprovacao do comite</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 min-h-0">
                <ScrollArea className="h-full">
                  <div className="space-y-4">
                    {validacoesPendentes.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 rounded-lg border border-border/50 hover:border-primary/30 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="outline" className="text-xs">
                                {item.tipo}
                              </Badge>
                              <Badge
                                variant="outline"
                                className={
                                  item.prioridade === "alta"
                                    ? "bg-red-500/10 text-red-500 border-red-500/20"
                                    : item.prioridade === "media"
                                      ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                                      : "bg-green-500/10 text-green-500 border-green-500/20"
                                }
                              >
                                {item.prioridade}
                              </Badge>
                            </div>
                            <h3 className="font-medium">{item.titulo}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{item.descricao}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>Solicitante: {item.solicitante}</span>
                            <span>Data: {item.data}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 text-sm">
                              <ThumbsUp className="w-4 h-4 text-green-500" />
                              <span>{item.votos.favor}</span>
                              <ThumbsDown className="w-4 h-4 text-red-500 ml-2" />
                              <span>{item.votos.contra}</span>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-green-500 border-green-500/20 hover:bg-green-500/10 bg-transparent"
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Aprovar
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-red-500 border-red-500/20 hover:bg-red-500/10 bg-transparent"
                              >
                                <XCircle className="w-4 h-4 mr-1" />
                                Rejeitar
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Membros do Comite */}
          <div className="flex flex-col min-h-0">
            <Card className="flex-1 flex flex-col border-border/50">
              <CardHeader className="flex-shrink-0">
                <CardTitle className="text-base">Membros do Comite</CardTitle>
                <CardDescription>5 membros ativos</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 min-h-0">
                <ScrollArea className="h-full">
                  <div className="space-y-3">
                    {membrosComite.map((membro) => (
                      <div
                        key={membro.id}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-primary/10 text-primary text-sm">
                            {membro.nome
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{membro.nome}</p>
                          <p className="text-xs text-muted-foreground">{membro.cargo}</p>
                        </div>
                        <div
                          className={`w-2 h-2 rounded-full ${membro.status === "online" ? "bg-green-500" : "bg-muted"}`}
                        />
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
