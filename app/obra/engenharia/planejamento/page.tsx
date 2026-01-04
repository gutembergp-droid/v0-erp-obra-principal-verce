"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layout/app-layout"
import { Header } from "@/components/layout/header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { InfoTooltip } from "@/components/ui/info-tooltip"
import {
  Plus,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Calendar,
  Target,
  TrendingUp,
  BarChart3,
  ArrowRight,
  Package,
  Zap,
  Flag,
} from "lucide-react"

// Dados mockados de Cronograma
const cronogramaMock = [
  {
    id: "FASE-01",
    descricao: "Mobilizacao",
    dataInicio: "2024-01-15",
    dataFim: "2024-02-15",
    duracaoPlanejada: 30,
    duracaoReal: 28,
    avancoFisico: 100,
    status: "concluido",
  },
  {
    id: "FASE-02",
    descricao: "Terraplenagem",
    dataInicio: "2024-02-01",
    dataFim: "2026-06-30",
    duracaoPlanejada: 880,
    duracaoReal: 730,
    avancoFisico: 85,
    status: "em_andamento",
  },
  {
    id: "FASE-03",
    descricao: "Pavimentacao",
    dataInicio: "2025-06-01",
    dataFim: "2027-12-31",
    duracaoPlanejada: 940,
    duracaoReal: 235,
    avancoFisico: 25,
    status: "em_andamento",
  },
  {
    id: "FASE-04",
    descricao: "Obras de Arte Especiais",
    dataInicio: "2025-01-01",
    dataFim: "2027-06-30",
    duracaoPlanejada: 910,
    duracaoReal: 365,
    avancoFisico: 30,
    status: "em_andamento",
  },
  {
    id: "FASE-05",
    descricao: "Sinalizacao e Acabamentos",
    dataInicio: "2027-06-01",
    dataFim: "2027-12-31",
    duracaoPlanejada: 210,
    duracaoReal: 0,
    avancoFisico: 0,
    status: "nao_iniciado",
  },
]

// Dados mockados de Pacotes de Trabalho
const pacotesMock = [
  {
    id: "PT-001",
    descricao: "Escavacao Trecho km 100-110",
    itemEAP: "1.1 - Escavacao 1a categoria",
    responsavel: "Equipe A",
    dataInicio: "2026-01-06",
    dataFim: "2026-01-20",
    volumePlanejado: 25000,
    volumeRealizado: 18500,
    unidade: "m3",
    status: "em_andamento",
  },
  {
    id: "PT-002",
    descricao: "Compactacao Aterro km 95-100",
    itemEAP: "1.4 - Compactacao",
    responsavel: "Equipe B",
    dataInicio: "2026-01-08",
    dataFim: "2026-01-25",
    volumePlanejado: 15000,
    volumeRealizado: 15000,
    unidade: "m3",
    status: "concluido",
  },
  {
    id: "PT-003",
    descricao: "Fundacoes Ponte Rio Paraiba",
    itemEAP: "3.1 - Fundacoes",
    responsavel: "Equipe C",
    dataInicio: "2026-01-15",
    dataFim: "2026-03-15",
    volumePlanejado: 8,
    volumeRealizado: 2,
    unidade: "un",
    status: "em_andamento",
  },
]

// Dados mockados de Caminho Critico
const caminhoCriticoMock = [
  {
    atividade: "Fundacoes Ponte Rio Paraiba",
    folga: 0,
    duracao: 60,
    predecessora: "Mobilizacao",
    impacto: "Atraso impacta entrega final",
    criticidade: "critica",
  },
  {
    atividade: "Superestrutura Ponte",
    folga: 0,
    duracao: 90,
    predecessora: "Fundacoes Ponte",
    impacto: "Sequencia obrigatoria",
    criticidade: "critica",
  },
  {
    atividade: "Pavimentacao Trecho Norte",
    folga: 15,
    duracao: 120,
    predecessora: "Terraplenagem Norte",
    impacto: "Folga de 15 dias",
    criticidade: "atencao",
  },
]

function formatNumber(value: number) {
  return new Intl.NumberFormat("pt-BR").format(value)
}

export default function PlanejamentoPage() {
  const [tab, setTab] = useState("cronograma")

  const avancoGeral = cronogramaMock.reduce((acc, f) => acc + f.avancoFisico, 0) / cronogramaMock.length
  const atividadesCriticas = caminhoCriticoMock.filter((c) => c.criticidade === "critica").length

  return (
    <AppLayout>
      <Header
        title="Planejamento e Controle"
        description="Cronograma, Pacotes de Trabalho, Caminho Critico e Avanco Fisico"
        rightContent={
          <InfoTooltip
            title="Setor de Planejamento e Controle"
            description="Gerencia o Cronograma geral da obra, Pacotes de Trabalho (Work Packages), Caminho Critico (CPM) e Avanco Fisico por item da EAP."
          />
        }
      />

      <div className="p-6 space-y-6">
        {/* Metricas */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Target className="w-4 h-4" />
                Avanco Geral
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{avancoGeral.toFixed(0)}%</div>
              <Progress value={avancoGeral} className="mt-2 h-2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Prazo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Dez/2027</div>
              <p className="text-xs text-green-500">No prazo</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Package className="w-4 h-4" />
                Pacotes Ativos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pacotesMock.filter((p) => p.status === "em_andamento").length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Atividades Criticas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">{atividadesCriticas}</div>
              <p className="text-xs text-muted-foreground">no caminho critico</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                SPI
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">1.02</div>
              <p className="text-xs text-muted-foreground">adiantado</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="cronograma">
              <Calendar className="w-4 h-4 mr-2" />
              Cronograma
            </TabsTrigger>
            <TabsTrigger value="pacotes">
              <Package className="w-4 h-4 mr-2" />
              Pacotes de Trabalho
            </TabsTrigger>
            <TabsTrigger value="critico">
              <Zap className="w-4 h-4 mr-2" />
              Caminho Critico
            </TabsTrigger>
            <TabsTrigger value="avanco">
              <BarChart3 className="w-4 h-4 mr-2" />
              Avanco Fisico
            </TabsTrigger>
          </TabsList>

          {/* Cronograma */}
          <TabsContent value="cronograma">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-base">Cronograma Geral</CardTitle>
                    <CardDescription>Fases principais do projeto</CardDescription>
                  </div>
                  <Button variant="outline">
                    <Calendar className="w-4 h-4 mr-2" />
                    Ver Gantt
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Fase</TableHead>
                      <TableHead>Inicio</TableHead>
                      <TableHead>Fim</TableHead>
                      <TableHead className="text-center">Duracao</TableHead>
                      <TableHead className="text-center">Avanco</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cronogramaMock.map((fase) => (
                      <TableRow key={fase.id}>
                        <TableCell className="font-mono font-bold">{fase.id}</TableCell>
                        <TableCell className="font-semibold">{fase.descricao}</TableCell>
                        <TableCell>{new Date(fase.dataInicio).toLocaleDateString("pt-BR")}</TableCell>
                        <TableCell>{new Date(fase.dataFim).toLocaleDateString("pt-BR")}</TableCell>
                        <TableCell className="text-center">
                          <span className="font-mono">{fase.duracaoPlanejada}d</span>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center gap-2 justify-center">
                            <Progress value={fase.avancoFisico} className="w-16 h-2" />
                            <span className="text-sm font-mono">{fase.avancoFisico}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {fase.status === "concluido" && (
                            <Badge className="bg-green-500">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Concluido
                            </Badge>
                          )}
                          {fase.status === "em_andamento" && (
                            <Badge variant="outline" className="text-blue-500">
                              <ArrowRight className="w-3 h-3 mr-1" />
                              Em Andamento
                            </Badge>
                          )}
                          {fase.status === "nao_iniciado" && (
                            <Badge variant="secondary">
                              <Clock className="w-3 h-3 mr-1" />
                              Nao Iniciado
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pacotes de Trabalho */}
          <TabsContent value="pacotes">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-base">Pacotes de Trabalho</CardTitle>
                    <CardDescription>Work Packages ativos e planejados</CardDescription>
                  </div>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Novo Pacote
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Descricao</TableHead>
                      <TableHead>Item EAP</TableHead>
                      <TableHead>Equipe</TableHead>
                      <TableHead className="text-right">Planejado</TableHead>
                      <TableHead className="text-right">Realizado</TableHead>
                      <TableHead className="text-center">Progresso</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pacotesMock.map((pt) => (
                      <TableRow key={pt.id}>
                        <TableCell className="font-mono font-bold">{pt.id}</TableCell>
                        <TableCell>{pt.descricao}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{pt.itemEAP}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{pt.responsavel}</Badge>
                        </TableCell>
                        <TableCell className="text-right font-mono">
                          {formatNumber(pt.volumePlanejado)} {pt.unidade}
                        </TableCell>
                        <TableCell className="text-right font-mono">
                          {formatNumber(pt.volumeRealizado)} {pt.unidade}
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center gap-2 justify-center">
                            <Progress value={(pt.volumeRealizado / pt.volumePlanejado) * 100} className="w-16 h-2" />
                            <span className="text-sm font-mono">
                              {((pt.volumeRealizado / pt.volumePlanejado) * 100).toFixed(0)}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {pt.status === "concluido" && (
                            <Badge className="bg-green-500">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Concluido
                            </Badge>
                          )}
                          {pt.status === "em_andamento" && (
                            <Badge variant="outline" className="text-blue-500">
                              <ArrowRight className="w-3 h-3 mr-1" />
                              Em Andamento
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Caminho Critico */}
          <TabsContent value="critico">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Caminho Critico (CPM)</CardTitle>
                <CardDescription>Atividades que determinam a duracao minima do projeto</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Atividade</TableHead>
                      <TableHead>Predecessora</TableHead>
                      <TableHead className="text-center">Duracao</TableHead>
                      <TableHead className="text-center">Folga</TableHead>
                      <TableHead>Impacto</TableHead>
                      <TableHead>Criticidade</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {caminhoCriticoMock.map((cc, idx) => (
                      <TableRow key={idx} className={cc.criticidade === "critica" ? "bg-red-500/5" : ""}>
                        <TableCell className="font-semibold">{cc.atividade}</TableCell>
                        <TableCell className="text-muted-foreground">{cc.predecessora}</TableCell>
                        <TableCell className="text-center font-mono">{cc.duracao}d</TableCell>
                        <TableCell className="text-center">
                          <Badge variant={cc.folga === 0 ? "destructive" : "secondary"}>{cc.folga}d</Badge>
                        </TableCell>
                        <TableCell className="text-sm">{cc.impacto}</TableCell>
                        <TableCell>
                          {cc.criticidade === "critica" && (
                            <Badge variant="destructive">
                              <Flag className="w-3 h-3 mr-1" />
                              Critica
                            </Badge>
                          )}
                          {cc.criticidade === "atencao" && (
                            <Badge variant="outline" className="text-amber-500">
                              <AlertTriangle className="w-3 h-3 mr-1" />
                              Atencao
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Avanco Fisico */}
          <TabsContent value="avanco">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Avanco Fisico por Item da EAP</CardTitle>
                <CardDescription>Progresso fisico consolidado</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {cronogramaMock.map((fase) => (
                    <div key={fase.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-mono text-sm text-muted-foreground">{fase.id}</span>
                          <span className="ml-2 font-semibold">{fase.descricao}</span>
                        </div>
                        <span className="font-mono font-bold">{fase.avancoFisico}%</span>
                      </div>
                      <Progress value={fase.avancoFisico} className="h-3" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  )
}
