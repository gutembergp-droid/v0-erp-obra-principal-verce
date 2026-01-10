"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sparkles,
  Zap,
  Activity,
  TrendingUp,
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  Bot,
  Send,
  ArrowRight,
  BarChart3,
} from "lucide-react"
import { useState } from "react"
import { InfoTooltip } from "@/components/ui/info-tooltip"

const agentes = [
  {
    id: "atena",
    nome: "ATENA",
    funcao: "Estrategia & Estrutura",
    descricao: "Planejamento, modelagem de EAP e estruturacao de projetos",
    status: "online",
    tarefasHoje: 47,
    precisao: 94.2,
    cor: "bg-blue-500",
  },
  {
    id: "pluto",
    nome: "PLUTO",
    funcao: "Comercial & Financeiro",
    descricao: "Controle de receita, margem, analise de custos e rentabilidade",
    status: "online",
    tarefasHoje: 89,
    precisao: 96.8,
    cor: "bg-green-500",
  },
  {
    id: "temis",
    nome: "TEMIS",
    funcao: "Compliance & Acessos",
    descricao: "Vigilancia da Catraca, auditoria e controle de conformidade",
    status: "online",
    tarefasHoje: 156,
    precisao: 99.1,
    cor: "bg-purple-500",
  },
  {
    id: "hefesto",
    nome: "HEFESTO",
    funcao: "Producao & Campo",
    descricao: "Monitoramento de execucao, produtividade e equipamentos",
    status: "online",
    tarefasHoje: 234,
    precisao: 91.5,
    cor: "bg-orange-500",
  },
]

const atividadesRecentes = [
  { id: 1, agente: "PLUTO", acao: "Analise de desvio de custo BR-101", tempo: "2 min", tipo: "analise" },
  { id: 2, agente: "TEMIS", acao: "Validacao de acesso nivel 3 aprovada", tempo: "5 min", tipo: "aprovacao" },
  { id: 3, agente: "ATENA", acao: "Revisao de EAP solicitada para Lote 2", tempo: "12 min", tipo: "revisao" },
  { id: 4, agente: "HEFESTO", acao: "Alerta de produtividade abaixo da meta", tempo: "18 min", tipo: "alerta" },
  { id: 5, agente: "PLUTO", acao: "Relatorio de medicao gerado", tempo: "25 min", tipo: "documento" },
  { id: 6, agente: "TEMIS", acao: "Auditoria de compliance concluida", tempo: "32 min", tipo: "aprovacao" },
]

const metricas = [
  { label: "Tarefas Processadas Hoje", valor: "1.247", variacao: "+12%", icon: Zap },
  { label: "Precisao Media", valor: "95.4%", variacao: "+2.1%", icon: TrendingUp },
  { label: "Tempo Medio Resposta", valor: "1.2s", variacao: "-0.3s", icon: Clock },
  { label: "Usuarios Ativos", valor: "89", variacao: "+5", icon: Users },
]

export default function HermesPage() {
  const [mensagem, setMensagem] = useState("")

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-foreground">Protocolo HERMES</h1>
                <InfoTooltip
                  title="Protocolo HERMES"
                  description="Sistema de orquestracao central de agentes de IA. Coordena ATENA, PLUTO, TEMIS e HEFESTO para automacao inteligente de processos."
                />
              </div>
              <p className="text-sm text-muted-foreground">Orquestrador Central de Agentes Inteligentes</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
              <Activity className="w-3 h-3 mr-1 animate-pulse" />
              Sistema Operacional
            </Badge>
          </div>
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
                    <p className="text-xs text-green-500">{metrica.variacao}</p>
                  </div>
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                    <metrica.icon className="w-5 h-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Conteudo Principal */}
        <div className="flex-1 min-h-0 grid grid-cols-3 gap-6">
          {/* Coluna Esquerda - Agentes */}
          <div className="col-span-2 flex flex-col min-h-0">
            <Tabs defaultValue="agentes" className="flex-1 flex flex-col min-h-0">
              <TabsList className="w-fit flex-shrink-0">
                <TabsTrigger value="agentes">Agentes Ativos</TabsTrigger>
                <TabsTrigger value="comandos">Central de Comandos</TabsTrigger>
                <TabsTrigger value="logs">Logs do Sistema</TabsTrigger>
              </TabsList>

              <TabsContent value="agentes" className="flex-1 min-h-0 mt-4">
                <div className="grid grid-cols-2 gap-4 h-full">
                  {agentes.map((agente) => (
                    <Card key={agente.id} className="border-border/50 hover:border-primary/30 transition-colors">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", agente.cor)}>
                              <Bot className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <CardTitle className="text-base">{agente.nome}</CardTitle>
                              <CardDescription className="text-xs">{agente.funcao}</CardDescription>
                            </div>
                          </div>
                          <Badge
                            variant="outline"
                            className="bg-green-500/10 text-green-500 border-green-500/20 text-xs"
                          >
                            Online
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs text-muted-foreground mb-3">{agente.descricao}</p>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">Tarefas hoje</span>
                            <span className="font-medium">{agente.tarefasHoje}</span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">Precisao</span>
                            <span className="font-medium">{agente.precisao}%</span>
                          </div>
                          <Progress value={agente.precisao} className="h-1" />
                        </div>
                        <Button variant="ghost" size="sm" className="w-full mt-3 text-xs">
                          Interagir com {agente.nome}
                          <ArrowRight className="w-3 h-3 ml-1" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="comandos" className="flex-1 min-h-0 mt-4">
                <Card className="h-full flex flex-col border-border/50">
                  <CardHeader className="flex-shrink-0">
                    <CardTitle className="text-base">Central de Comandos HERMES</CardTitle>
                    <CardDescription>Envie comandos para os agentes ou solicite analises</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col min-h-0">
                    <ScrollArea className="flex-1 mb-4">
                      <div className="space-y-4">
                        <div className="flex gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Sparkles className="w-4 h-4 text-primary" />
                          </div>
                          <div className="flex-1 bg-muted/50 rounded-lg p-3">
                            <p className="text-sm">
                              Ola! Sou o HERMES, seu orquestrador central. Como posso ajudar hoje?
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Posso coordenar ATENA, PLUTO, TEMIS ou HEFESTO para suas necessidades.
                            </p>
                          </div>
                        </div>
                      </div>
                    </ScrollArea>
                    <div className="flex gap-2 flex-shrink-0">
                      <input
                        type="text"
                        placeholder="Digite um comando ou pergunta..."
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
              </TabsContent>

              <TabsContent value="logs" className="flex-1 min-h-0 mt-4">
                <Card className="h-full border-border/50">
                  <CardHeader className="flex-shrink-0">
                    <CardTitle className="text-base">Logs do Sistema</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[300px]">
                      <div className="space-y-2 font-mono text-xs">
                        <p className="text-green-500">[2026-01-04 14:32:15] HERMES: Sistema iniciado com sucesso</p>
                        <p className="text-blue-500">
                          [2026-01-04 14:32:16] ATENA: Conectado ao modulo de planejamento
                        </p>
                        <p className="text-green-500">
                          [2026-01-04 14:32:17] PLUTO: Sincronizacao financeira concluida
                        </p>
                        <p className="text-purple-500">[2026-01-04 14:32:18] TEMIS: Verificacao de compliance ativa</p>
                        <p className="text-orange-500">[2026-01-04 14:32:19] HEFESTO: Monitoramento de campo online</p>
                        <p className="text-muted-foreground">
                          [2026-01-04 14:33:01] PLUTO: Processando analise de custo...
                        </p>
                        <p className="text-muted-foreground">[2026-01-04 14:33:45] TEMIS: 3 acessos validados</p>
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Coluna Direita - Atividades */}
          <div className="flex flex-col min-h-0">
            <Card className="flex-1 flex flex-col border-border/50">
              <CardHeader className="flex-shrink-0">
                <CardTitle className="text-base flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  Atividades Recentes
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 min-h-0">
                <ScrollArea className="h-full">
                  <div className="space-y-3">
                    {atividadesRecentes.map((atividade) => (
                      <div
                        key={atividade.id}
                        className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div
                          className={cn(
                            "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                            atividade.tipo === "analise" && "bg-blue-500/10 text-blue-500",
                            atividade.tipo === "aprovacao" && "bg-green-500/10 text-green-500",
                            atividade.tipo === "revisao" && "bg-yellow-500/10 text-yellow-500",
                            atividade.tipo === "alerta" && "bg-red-500/10 text-red-500",
                            atividade.tipo === "documento" && "bg-purple-500/10 text-purple-500",
                          )}
                        >
                          {atividade.tipo === "analise" && <BarChart3 className="w-4 h-4" />}
                          {atividade.tipo === "aprovacao" && <CheckCircle className="w-4 h-4" />}
                          {atividade.tipo === "revisao" && <FileText className="w-4 h-4" />}
                          {atividade.tipo === "alerta" && <AlertTriangle className="w-4 h-4" />}
                          {atividade.tipo === "documento" && <FileText className="w-4 h-4" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{atividade.acao}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <Badge variant="outline" className="text-xs px-1.5 py-0">
                              {atividade.agente}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{atividade.tempo}</span>
                          </div>
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

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}
