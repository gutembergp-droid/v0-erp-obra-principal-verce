"use client"

import { useState, Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { InfoTooltip } from "@/components/ui/info-tooltip"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
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
  Users,
  Truck,
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
    avancoPlanejado: 100,
    status: "concluido",
    responsavel: "Eng. Carlos Lima",
    recursos: 45,
  },
  {
    id: "FASE-02",
    descricao: "Terraplenagem",
    dataInicio: "2024-02-01",
    dataFim: "2026-06-30",
    duracaoPlanejada: 880,
    duracaoReal: 730,
    avancoFisico: 85,
    avancoPlanejado: 82,
    status: "em_andamento",
    responsavel: "Eng. Roberto Santos",
    recursos: 120,
  },
  {
    id: "FASE-03",
    descricao: "Pavimentacao",
    dataInicio: "2025-06-01",
    dataFim: "2027-12-31",
    duracaoPlanejada: 940,
    duracaoReal: 235,
    avancoFisico: 25,
    avancoPlanejado: 28,
    status: "em_andamento",
    responsavel: "Eng. Ana Paula",
    recursos: 85,
  },
  {
    id: "FASE-04",
    descricao: "Obras de Arte Especiais",
    dataInicio: "2025-01-01",
    dataFim: "2027-06-30",
    duracaoPlanejada: 910,
    duracaoReal: 365,
    avancoFisico: 30,
    avancoPlanejado: 35,
    status: "em_andamento",
    responsavel: "Eng. Marcos Silva",
    recursos: 65,
  },
  {
    id: "FASE-05",
    descricao: "Sinalizacao e Acabamentos",
    dataInicio: "2027-06-01",
    dataFim: "2027-12-31",
    duracaoPlanejada: 210,
    duracaoReal: 0,
    avancoFisico: 0,
    avancoPlanejado: 0,
    status: "nao_iniciado",
    responsavel: "Eng. Julia Costa",
    recursos: 0,
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
    efetivo: 25,
    equipamentos: 8,
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
    efetivo: 18,
    equipamentos: 5,
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
    efetivo: 32,
    equipamentos: 12,
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

function PlanejamentoContent() {
  const [tab, setTab] = useState("cronograma")
  const [selectedFase, setSelectedFase] = useState<(typeof cronogramaMock)[0] | null>(null)
  const [selectedPacote, setSelectedPacote] = useState<(typeof pacotesMock)[0] | null>(null)

  const avancoGeral = cronogramaMock.reduce((acc, f) => acc + f.avancoFisico, 0) / cronogramaMock.length
  const avancoPlanejado = cronogramaMock.reduce((acc, f) => acc + f.avancoPlanejado, 0) / cronogramaMock.length
  const atividadesCriticas = caminhoCriticoMock.filter((c) => c.criticidade === "critica").length
  const pacotesAtivos = pacotesMock.filter((p) => p.status === "em_andamento").length
  const spi = (avancoGeral / avancoPlanejado).toFixed(2)

  return (
    <div className="flex flex-col h-full overflow-auto">
      <div className="px-6 pt-6 pb-2">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">Planejamento e Controle</h1>
          <InfoTooltip
            title="Setor de Planejamento e Controle"
            description="Gerencia o Cronograma geral da obra, Pacotes de Trabalho (Work Packages), Caminho Critico (CPM) e Avanco Fisico por item da EAP."
          />
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Cronograma, Pacotes de Trabalho, Caminho Critico e Avanco Fisico
        </p>
      </div>

      <div className="p-6 space-y-6 flex-1">
        {/* Metricas */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Target className="w-4 h-4" />
                Avanco Real
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{avancoGeral.toFixed(0)}%</div>
              <Progress value={avancoGeral} className="mt-2 h-2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Avanco Planejado
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avancoPlanejado.toFixed(0)}%</div>
              <Progress value={avancoPlanejado} className="mt-2 h-2 bg-muted" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Prazo Final
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Dez/2027</div>
              <p className="text-xs text-primary">No prazo</p>
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
              <div className="text-2xl font-bold">{pacotesAtivos}</div>
              <p className="text-xs text-muted-foreground">em execucao</p>
            </CardContent>
          </Card>
          <Card className={atividadesCriticas > 0 ? "border-destructive/50" : ""}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Atividades Criticas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${atividadesCriticas > 0 ? "text-destructive" : "text-primary"}`}>
                {atividadesCriticas}
              </div>
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
              <div className={`text-2xl font-bold ${Number(spi) >= 1 ? "text-primary" : "text-destructive"}`}>
                {spi}
              </div>
              <p className="text-xs text-muted-foreground">{Number(spi) >= 1 ? "adiantado" : "atrasado"}</p>
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
                      <TableHead className="text-center">Real vs Plan</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cronogramaMock.map((fase) => {
                      const desvio = fase.avancoFisico - fase.avancoPlanejado
                      return (
                        <TableRow
                          key={fase.id}
                          className="cursor-pointer hover:bg-muted/50"
                          onClick={() => setSelectedFase(fase)}
                        >
                          <TableCell className="font-mono font-bold">{fase.id}</TableCell>
                          <TableCell className="font-semibold">{fase.descricao}</TableCell>
                          <TableCell>{new Date(fase.dataInicio).toLocaleDateString("pt-BR")}</TableCell>
                          <TableCell>{new Date(fase.dataFim).toLocaleDateString("pt-BR")}</TableCell>
                          <TableCell className="text-center">
                            <span className="font-mono">{fase.duracaoPlanejada}d</span>
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex flex-col items-center gap-1">
                              <div className="flex items-center gap-2">
                                <Progress value={fase.avancoFisico} className="w-16 h-2" />
                                <span className="text-sm font-mono">{fase.avancoFisico}%</span>
                              </div>
                              <span className={`text-xs ${desvio >= 0 ? "text-primary" : "text-destructive"}`}>
                                {desvio >= 0 ? "+" : ""}
                                {desvio}% vs plan
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            {fase.status === "concluido" && (
                              <Badge className="bg-primary/20 text-primary">
                                <CheckCircle2 className="w-3 h-3 mr-1" />
                                Concluido
                              </Badge>
                            )}
                            {fase.status === "em_andamento" && (
                              <Badge variant="outline" className="text-chart-1">
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
                      )
                    })}
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
                      <TableRow
                        key={pt.id}
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => setSelectedPacote(pt)}
                      >
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
                          {pt.status === "concluido" ? (
                            <Badge className="bg-primary/20 text-primary">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Concluido
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-chart-1">
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
                      <TableRow key={idx} className={cc.criticidade === "critica" ? "bg-destructive/5" : ""}>
                        <TableCell className="font-semibold">{cc.atividade}</TableCell>
                        <TableCell className="text-muted-foreground">{cc.predecessora}</TableCell>
                        <TableCell className="text-center font-mono">{cc.duracao}d</TableCell>
                        <TableCell className="text-center">
                          <Badge variant={cc.folga === 0 ? "destructive" : "secondary"}>{cc.folga}d</Badge>
                        </TableCell>
                        <TableCell className="text-sm">{cc.impacto}</TableCell>
                        <TableCell>
                          {cc.criticidade === "critica" ? (
                            <Badge variant="destructive">
                              <Flag className="w-3 h-3 mr-1" />
                              Critica
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-chart-4">
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
                <CardTitle className="text-base">Avanco Fisico por Fase</CardTitle>
                <CardDescription>Comparativo Real vs Planejado</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {cronogramaMock.map((fase) => {
                    const desvio = fase.avancoFisico - fase.avancoPlanejado
                    return (
                      <div key={fase.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-mono text-sm text-muted-foreground">{fase.id}</span>
                            <span className="ml-2 font-semibold">{fase.descricao}</span>
                          </div>
                          <div className="text-right">
                            <span className="font-mono font-bold">{fase.avancoFisico}%</span>
                            <span className={`ml-2 text-sm ${desvio >= 0 ? "text-primary" : "text-destructive"}`}>
                              ({desvio >= 0 ? "+" : ""}
                              {desvio}%)
                            </span>
                          </div>
                        </div>
                        <div className="relative">
                          <Progress value={fase.avancoFisico} className="h-3" />
                          <div
                            className="absolute top-0 h-3 border-r-2 border-chart-4"
                            style={{ left: `${fase.avancoPlanejado}%` }}
                            title={`Planejado: ${fase.avancoPlanejado}%`}
                          />
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Real: {fase.avancoFisico}%</span>
                          <span>Planejado: {fase.avancoPlanejado}%</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Painel lateral para fase selecionada */}
      <Sheet open={!!selectedFase} onOpenChange={() => setSelectedFase(null)}>
        <SheetContent className="w-[400px] sm:w-[500px] overflow-auto">
          {selectedFase && (
            <>
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  {selectedFase.id} - {selectedFase.descricao}
                </SheetTitle>
                <SheetDescription>Detalhes da fase do cronograma</SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Inicio</p>
                    <p className="text-sm font-medium">
                      {new Date(selectedFase.dataInicio).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Fim Previsto</p>
                    <p className="text-sm font-medium">{new Date(selectedFase.dataFim).toLocaleDateString("pt-BR")}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Duracao</p>
                    <p className="text-sm font-medium">{selectedFase.duracaoPlanejada} dias</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Responsavel</p>
                    <p className="text-sm font-medium">{selectedFase.responsavel}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Avanco</p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Real</span>
                      <span className="font-mono font-bold text-primary">{selectedFase.avancoFisico}%</span>
                    </div>
                    <Progress value={selectedFase.avancoFisico} className="h-3" />
                    <div className="flex justify-between">
                      <span className="text-sm">Planejado</span>
                      <span className="font-mono">{selectedFase.avancoPlanejado}%</span>
                    </div>
                    <Progress value={selectedFase.avancoPlanejado} className="h-3 bg-muted" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="pt-4">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Recursos</span>
                      </div>
                      <p className="text-xl font-bold mt-1">{selectedFase.recursos}</p>
                      <p className="text-xs text-muted-foreground">colaboradores</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-4">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Desvio</span>
                      </div>
                      <p
                        className={`text-xl font-bold mt-1 ${selectedFase.avancoFisico - selectedFase.avancoPlanejado >= 0 ? "text-primary" : "text-destructive"}`}
                      >
                        {selectedFase.avancoFisico - selectedFase.avancoPlanejado >= 0 ? "+" : ""}
                        {selectedFase.avancoFisico - selectedFase.avancoPlanejado}%
                      </p>
                      <p className="text-xs text-muted-foreground">vs planejado</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Painel lateral para pacote selecionado */}
      <Sheet open={!!selectedPacote} onOpenChange={() => setSelectedPacote(null)}>
        <SheetContent className="w-[400px] sm:w-[500px] overflow-auto">
          {selectedPacote && (
            <>
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  {selectedPacote.id}
                </SheetTitle>
                <SheetDescription>{selectedPacote.descricao}</SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Item EAP</p>
                    <p className="text-sm font-medium">{selectedPacote.itemEAP}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Equipe</p>
                    <Badge variant="secondary">{selectedPacote.responsavel}</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Inicio</p>
                    <p className="text-sm font-medium">
                      {new Date(selectedPacote.dataInicio).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Fim</p>
                    <p className="text-sm font-medium">
                      {new Date(selectedPacote.dataFim).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Progresso</p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Realizado</span>
                      <span className="font-mono font-bold">
                        {formatNumber(selectedPacote.volumeRealizado)} {selectedPacote.unidade}
                      </span>
                    </div>
                    <Progress
                      value={(selectedPacote.volumeRealizado / selectedPacote.volumePlanejado) * 100}
                      className="h-3"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>
                        Meta: {formatNumber(selectedPacote.volumePlanejado)} {selectedPacote.unidade}
                      </span>
                      <span>
                        {((selectedPacote.volumeRealizado / selectedPacote.volumePlanejado) * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="pt-4">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Efetivo</span>
                      </div>
                      <p className="text-xl font-bold mt-1">{selectedPacote.efetivo}</p>
                      <p className="text-xs text-muted-foreground">pessoas</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-4">
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Equipamentos</span>
                      </div>
                      <p className="text-xl font-bold mt-1">{selectedPacote.equipamentos}</p>
                      <p className="text-xs text-muted-foreground">mobilizados</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default function PlanejamentoPage() {
  return (
    <Suspense fallback={null}>
      <PlanejamentoContent />
    </Suspense>
  )
}
