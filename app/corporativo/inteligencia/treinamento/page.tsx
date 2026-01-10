"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  GraduationCap,
  Brain,
  BookOpen,
  FileText,
  Upload,
  CheckCircle,
  Clock,
  Pause,
  RotateCcw,
  Database,
  Cpu,
  TrendingUp,
} from "lucide-react"
import { InfoTooltip } from "@/components/ui/info-tooltip"

const treinamentosAtivos = [
  {
    id: 1,
    agente: "ATENA",
    modelo: "Estruturacao EAP v2.3",
    progresso: 78,
    status: "treinando",
    dataset: "1.2M registros",
    tempoRestante: "2h 15min",
  },
  {
    id: 2,
    agente: "PLUTO",
    modelo: "Analise Margem v3.1",
    progresso: 100,
    status: "concluido",
    dataset: "890K registros",
    tempoRestante: "-",
  },
  {
    id: 3,
    agente: "TEMIS",
    modelo: "Compliance Check v1.8",
    progresso: 45,
    status: "treinando",
    dataset: "2.1M registros",
    tempoRestante: "4h 30min",
  },
]

const baseConhecimento = [
  { id: 1, nome: "Normas DNIT", documentos: 234, atualizado: "02/01/2026", tamanho: "1.2 GB" },
  { id: 2, nome: "Contratos Historicos", documentos: 567, atualizado: "01/01/2026", tamanho: "3.4 GB" },
  { id: 3, nome: "Medicoes Aprovadas", documentos: 1890, atualizado: "04/01/2026", tamanho: "890 MB" },
  { id: 4, nome: "Relatorios SSMA", documentos: 432, atualizado: "03/01/2026", tamanho: "560 MB" },
  { id: 5, nome: "Manuais Tecnicos", documentos: 89, atualizado: "28/12/2025", tamanho: "2.1 GB" },
]

const metricas = [
  { label: "Modelos Ativos", valor: "12", icon: Brain },
  { label: "Base de Conhecimento", valor: "8.2 GB", icon: Database },
  { label: "Documentos Indexados", valor: "3.2K", icon: FileText },
  { label: "Precisao Media", valor: "94.7%", icon: TrendingUp },
]

export default function TreinamentoPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-80px)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/20">
              <GraduationCap className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-foreground">Treinamento & Curadoria IAs</h1>
                <InfoTooltip
                  title="Treinamento & Curadoria"
                  description="Centro de treinamento e curadoria dos modelos de IA. Gerencie datasets, acompanhe treinamentos e mantenha a base de conhecimento atualizada."
                />
              </div>
              <p className="text-sm text-muted-foreground">Gestao de modelos, datasets e base de conhecimento</p>
            </div>
          </div>
          <Button>
            <Upload className="w-4 h-4 mr-2" />
            Upload Dataset
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
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-500/10">
                    <metrica.icon className="w-5 h-5 text-blue-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Conteudo */}
        <div className="flex-1 min-h-0">
          <Tabs defaultValue="treinamentos" className="h-full flex flex-col">
            <TabsList className="w-fit flex-shrink-0">
              <TabsTrigger value="treinamentos">Treinamentos Ativos</TabsTrigger>
              <TabsTrigger value="conhecimento">Base de Conhecimento</TabsTrigger>
              <TabsTrigger value="historico">Historico</TabsTrigger>
            </TabsList>

            <TabsContent value="treinamentos" className="flex-1 min-h-0 mt-4">
              <div className="space-y-4">
                {treinamentosAtivos.map((treino) => (
                  <Card key={treino.id} className="border-border/50">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Cpu className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">{treino.modelo}</h3>
                            <p className="text-sm text-muted-foreground">Agente: {treino.agente}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={treino.status === "concluido" ? "default" : "secondary"}>
                            {treino.status === "concluido" ? (
                              <>
                                <CheckCircle className="w-3 h-3 mr-1" /> Concluido
                              </>
                            ) : (
                              <>
                                <Clock className="w-3 h-3 mr-1 animate-pulse" /> Treinando
                              </>
                            )}
                          </Badge>
                          {treino.status === "treinando" && (
                            <div className="flex gap-1">
                              <Button size="icon" variant="ghost" className="h-8 w-8">
                                <Pause className="w-4 h-4" />
                              </Button>
                              <Button size="icon" variant="ghost" className="h-8 w-8">
                                <RotateCcw className="w-4 h-4" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Progresso</span>
                          <span className="font-medium">{treino.progresso}%</span>
                        </div>
                        <Progress value={treino.progresso} className="h-2" />
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>Dataset: {treino.dataset}</span>
                          <span>Tempo restante: {treino.tempoRestante}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="conhecimento" className="flex-1 min-h-0 mt-4">
              <Card className="h-full border-border/50">
                <CardHeader className="flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base">Base de Conhecimento</CardTitle>
                      <CardDescription>Documentos e datasets para treinamento dos agentes</CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      <Upload className="w-4 h-4 mr-2" />
                      Adicionar Documentos
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px]">
                    <div className="space-y-2">
                      {baseConhecimento.map((base) => (
                        <div
                          key={base.id}
                          className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                              <BookOpen className="w-5 h-5 text-muted-foreground" />
                            </div>
                            <div>
                              <h4 className="font-medium text-sm">{base.nome}</h4>
                              <p className="text-xs text-muted-foreground">
                                {base.documentos} documentos - {base.tamanho}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">Atualizado em</p>
                            <p className="text-sm font-medium">{base.atualizado}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="historico" className="flex-1 min-h-0 mt-4">
              <Card className="h-full border-border/50">
                <CardHeader>
                  <CardTitle className="text-base">Historico de Treinamentos</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Historico de treinamentos anteriores sera exibido aqui.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
  )
}
