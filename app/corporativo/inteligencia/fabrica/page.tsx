"use client"

import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bot, Plus, Settings, Copy, Code, Activity, GitBranch, Package, Cpu } from "lucide-react"
import { InfoTooltip } from "@/components/ui/info-tooltip"

const agentesDisponiveis = [
  {
    id: "atena",
    nome: "ATENA",
    versao: "2.3.1",
    tipo: "Estrategia",
    status: "producao",
    instancias: 3,
    memoria: "4 GB",
    cpu: "2 cores",
  },
  {
    id: "pluto",
    nome: "PLUTO",
    versao: "3.1.0",
    tipo: "Financeiro",
    status: "producao",
    instancias: 5,
    memoria: "8 GB",
    cpu: "4 cores",
  },
  {
    id: "temis",
    nome: "TEMIS",
    versao: "1.8.2",
    tipo: "Compliance",
    status: "producao",
    instancias: 2,
    memoria: "2 GB",
    cpu: "1 core",
  },
  {
    id: "hefesto",
    nome: "HEFESTO",
    versao: "1.2.0",
    tipo: "Producao",
    status: "beta",
    instancias: 1,
    memoria: "4 GB",
    cpu: "2 cores",
  },
]

const templates = [
  { id: 1, nome: "Agente Analitico", descricao: "Template para agentes de analise de dados", uso: 12 },
  { id: 2, nome: "Agente Validador", descricao: "Template para validacao e compliance", uso: 8 },
  { id: 3, nome: "Agente Monitor", descricao: "Template para monitoramento continuo", uso: 15 },
  { id: 4, nome: "Agente Gerador", descricao: "Template para geracao de documentos", uso: 6 },
]

const metricas = [
  { label: "Agentes Ativos", valor: "4", icon: Bot },
  { label: "Instancias Totais", valor: "11", icon: Cpu },
  { label: "Memoria Alocada", valor: "18 GB", icon: Package },
  { label: "Uptime", valor: "99.9%", icon: Activity },
]

export default function FabricaPage() {
  return (
    <AppLayout>
      <div className="flex flex-col h-[calc(100vh-80px)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-500/5 border border-orange-500/20">
              <Bot className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-foreground">Fabrica de Agentes</h1>
                <InfoTooltip
                  title="Fabrica de Agentes"
                  description="Centro de criacao, configuracao e deploy de agentes de IA. Gerencie versoes, escale instancias e monitore recursos."
                />
              </div>
              <p className="text-sm text-muted-foreground">Criacao, deploy e gestao de agentes inteligentes</p>
            </div>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Novo Agente
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
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-orange-500/10">
                    <metrica.icon className="w-5 h-5 text-orange-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Conteudo */}
        <div className="flex-1 min-h-0">
          <Tabs defaultValue="agentes" className="h-full flex flex-col">
            <TabsList className="w-fit flex-shrink-0">
              <TabsTrigger value="agentes">Agentes</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="deploy">Deploy & Versoes</TabsTrigger>
            </TabsList>

            <TabsContent value="agentes" className="flex-1 min-h-0 mt-4">
              <div className="grid grid-cols-2 gap-4">
                {agentesDisponiveis.map((agente) => (
                  <Card key={agente.id} className="border-border/50 hover:border-primary/30 transition-colors">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                            <Bot className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-base">{agente.nome}</CardTitle>
                            <CardDescription className="text-xs">
                              v{agente.versao} - {agente.tipo}
                            </CardDescription>
                          </div>
                        </div>
                        <Badge variant={agente.status === "producao" ? "default" : "secondary"}>{agente.status}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="text-center p-2 rounded-lg bg-muted/50">
                          <p className="text-lg font-bold">{agente.instancias}</p>
                          <p className="text-xs text-muted-foreground">Instancias</p>
                        </div>
                        <div className="text-center p-2 rounded-lg bg-muted/50">
                          <p className="text-lg font-bold">{agente.memoria}</p>
                          <p className="text-xs text-muted-foreground">Memoria</p>
                        </div>
                        <div className="text-center p-2 rounded-lg bg-muted/50">
                          <p className="text-lg font-bold">{agente.cpu}</p>
                          <p className="text-xs text-muted-foreground">CPU</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                          <Settings className="w-4 h-4 mr-1" />
                          Configurar
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                          <GitBranch className="w-4 h-4 mr-1" />
                          Versoes
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="templates" className="flex-1 min-h-0 mt-4">
              <div className="grid grid-cols-2 gap-4">
                {templates.map((template) => (
                  <Card
                    key={template.id}
                    className="border-border/50 hover:border-primary/30 transition-colors cursor-pointer"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                          <Code className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div>
                          <h3 className="font-medium">{template.nome}</h3>
                          <p className="text-xs text-muted-foreground">{template.descricao}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{template.uso} agentes criados</span>
                        <Button size="sm">
                          <Plus className="w-4 h-4 mr-1" />
                          Usar Template
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="deploy" className="flex-1 min-h-0 mt-4">
              <Card className="h-full border-border/50">
                <CardHeader>
                  <CardTitle className="text-base">Deploy & Controle de Versoes</CardTitle>
                  <CardDescription>Gerencie deploys e versoes dos agentes</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Interface de deploy e controle de versoes sera implementada aqui.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AppLayout>
  )
}
