"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { TooltipProvider } from "@/components/ui/tooltip"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import {
  ArrowLeft,
  Search,
  Plus,
  CheckCircle2,
  Clock,
  Target,
  TrendingUp,
  Download,
  Gauge,
  Calculator,
  Send,
  Save,
  FileCheck,
  AlertCircle,
  BarChart3,
  Layers,
} from "lucide-react"
import Link from "next/link"

// Dados de afericao
const afericoes = [
  {
    id: "1",
    periodo: "Janeiro/2024",
    pbs: "PBS-03.01",
    descricao: "Pilares",
    qtdAnterior: 230,
    qtdAtual: 270,
    qtdAferida: 40,
    unidade: "M3",
    pesoItem: 12.3,
    avancoAnterior: 51.1,
    avancoAtual: 60.0,
    avancoPeriodo: 8.9,
    contribuicao: 1.09,
    status: "aprovado",
    responsavel: "Eng. Carlos",
    dataAfericao: "2024-01-25",
  },
  {
    id: "2",
    periodo: "Janeiro/2024",
    pbs: "PBS-03.02",
    descricao: "Vigas",
    qtdAnterior: 280,
    qtdAtual: 300,
    qtdAferida: 20,
    unidade: "M3",
    pesoItem: 16.4,
    avancoAnterior: 46.7,
    avancoAtual: 50.0,
    avancoPeriodo: 3.3,
    contribuicao: 0.54,
    status: "aprovado",
    responsavel: "Eng. Carlos",
    dataAfericao: "2024-01-25",
  },
  {
    id: "3",
    periodo: "Janeiro/2024",
    pbs: "PBS-03.03",
    descricao: "Lajes",
    qtdAnterior: 1100,
    qtdAtual: 1250,
    qtdAferida: 150,
    unidade: "M2",
    pesoItem: 10.02,
    avancoAnterior: 22.0,
    avancoAtual: 25.0,
    avancoPeriodo: 3.0,
    contribuicao: 0.3,
    status: "pendente",
    responsavel: "Eng. Ana",
    dataAfericao: "2024-01-26",
  },
  {
    id: "4",
    periodo: "Janeiro/2024",
    pbs: "PBS-02.02.02",
    descricao: "Estacas HC D=80cm",
    qtdAnterior: 1200,
    qtdAtual: 1250,
    qtdAferida: 50,
    unidade: "ML",
    pesoItem: 4.08,
    avancoAnterior: 80.0,
    avancoAtual: 83.3,
    avancoPeriodo: 3.3,
    contribuicao: 0.13,
    status: "aprovado",
    responsavel: "Eng. Roberto",
    dataAfericao: "2024-01-24",
  },
]

// Resumo afericao
const resumoAfericao = {
  periodo: "Janeiro/2024",
  avancoAcumulado: 48.5,
  avancoPeriodo: 3.8,
  previstoAcumulado: 52.3,
  desvio: -3.8,
  itensAferidos: 12,
  itensPendentes: 3,
  contribuicaoTotal: 2.06,
}

export default function AfericaoPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedAfericao, setSelectedAfericao] = useState<(typeof afericoes)[0] | null>(null)
  const [activeTab, setActiveTab] = useState("mensal")
  const [periodoSelecionado, setPeriodoSelecionado] = useState("2024-01")

  const formatPercent = (value: number) => `${value.toFixed(1)}%`

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b bg-card">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <Link href="/obra/producao">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <div className="flex items-center gap-2">
                  <Gauge className="h-5 w-5 text-amber-600" />
                  <h1 className="text-xl font-bold">Afericao / Medicao de Producao</h1>
                </div>
                <p className="text-sm text-muted-foreground">Obra: Torre Norte - Centro Empresarial</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Select value={periodoSelecionado} onValueChange={setPeriodoSelecionado}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024-01">Janeiro/2024</SelectItem>
                  <SelectItem value="2023-12">Dezembro/2023</SelectItem>
                  <SelectItem value="2023-11">Novembro/2023</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Calculator className="h-4 w-4 mr-2" />
                Recalcular
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Nova Afericao
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Nova Afericao de Producao</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Periodo</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="2024-01">Janeiro/2024</SelectItem>
                            <SelectItem value="2024-02">Fevereiro/2024</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Item PBS</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="PBS-03.01">PBS-03.01 - Pilares</SelectItem>
                            <SelectItem value="PBS-03.02">PBS-03.02 - Vigas</SelectItem>
                            <SelectItem value="PBS-03.03">PBS-03.03 - Lajes</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label>Qtd Anterior</Label>
                        <Input type="number" placeholder="0" disabled />
                      </div>
                      <div>
                        <Label>Qtd Aferida</Label>
                        <Input type="number" placeholder="0" />
                      </div>
                      <div>
                        <Label>Qtd Atual</Label>
                        <Input type="number" placeholder="0" disabled />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Data Afericao</Label>
                        <Input type="date" />
                      </div>
                      <div>
                        <Label>Responsavel</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="carlos">Eng. Carlos</SelectItem>
                            <SelectItem value="ana">Eng. Ana</SelectItem>
                            <SelectItem value="roberto">Eng. Roberto</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label>Observacoes</Label>
                      <Textarea placeholder="Observacoes sobre a afericao..." />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Cancelar</Button>
                    <Button variant="outline">
                      <Save className="h-4 w-4 mr-2" />
                      Salvar Rascunho
                    </Button>
                    <Button className="bg-amber-600 hover:bg-amber-700">
                      <Send className="h-4 w-4 mr-2" />
                      Enviar para Aprovacao
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </header>

        <div className="p-6">
          {/* Cards de Resumo */}
          <div className="grid grid-cols-6 gap-4 mb-6">
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avanco Acumulado</p>
                    <p className="text-2xl font-bold">{formatPercent(resumoAfericao.avancoAcumulado)}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <Progress value={resumoAfericao.avancoAcumulado} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avanco Periodo</p>
                    <p className="text-2xl font-bold text-blue-600">+{formatPercent(resumoAfericao.avancoPeriodo)}</p>
                  </div>
                  <Gauge className="h-8 w-8 text-blue-600" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">{resumoAfericao.periodo}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Previsto</p>
                    <p className="text-2xl font-bold">{formatPercent(resumoAfericao.previstoAcumulado)}</p>
                  </div>
                  <Target className="h-8 w-8 text-purple-600" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">Conforme cronograma</p>
              </CardContent>
            </Card>

            <Card className={resumoAfericao.desvio < 0 ? "border-red-200 bg-red-50" : "border-green-200 bg-green-50"}>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Desvio</p>
                    <p
                      className={`text-2xl font-bold ${resumoAfericao.desvio < 0 ? "text-red-600" : "text-green-600"}`}
                    >
                      {resumoAfericao.desvio > 0 ? "+" : ""}
                      {formatPercent(resumoAfericao.desvio)}
                    </p>
                  </div>
                  <AlertCircle className={`h-8 w-8 ${resumoAfericao.desvio < 0 ? "text-red-600" : "text-green-600"}`} />
                </div>
                <p className="text-xs text-muted-foreground mt-2">Real vs Previsto</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Itens Aferidos</p>
                    <p className="text-2xl font-bold">{resumoAfericao.itensAferidos}</p>
                  </div>
                  <FileCheck className="h-8 w-8 text-amber-600" />
                </div>
                <p className="text-xs text-amber-600 mt-2">{resumoAfericao.itensPendentes} pendentes</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Contribuicao</p>
                    <p className="text-2xl font-bold text-emerald-600">
                      +{formatPercent(resumoAfericao.contribuicaoTotal)}
                    </p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-emerald-600" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">Peso no avanco geral</p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="flex items-center justify-between mb-4">
              <TabsList>
                <TabsTrigger value="mensal">Afericao Mensal</TabsTrigger>
                <TabsTrigger value="historico">Historico</TabsTrigger>
                <TabsTrigger value="pendentes">Pendentes</TabsTrigger>
                <TabsTrigger value="grafico">Evolucao</TabsTrigger>
              </TabsList>

              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar item PBS..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <TabsContent value="mensal" className="mt-0">
              <div className="flex gap-6">
                {/* Lista de Afericoes */}
                <Card className="flex-1">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Afericoes - {resumoAfericao.periodo}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="grid grid-cols-10 gap-2 px-4 py-2 bg-muted/50 border-b text-xs font-medium text-muted-foreground">
                      <div>PBS</div>
                      <div className="col-span-2">Descricao</div>
                      <div className="text-right">Anterior</div>
                      <div className="text-right">Aferido</div>
                      <div className="text-right">Atual</div>
                      <div className="text-right">% Ant</div>
                      <div className="text-right">% Atual</div>
                      <div className="text-right">Contrib.</div>
                      <div className="text-center">Status</div>
                    </div>
                    <ScrollArea className="h-[400px]">
                      {afericoes.map((item) => (
                        <div
                          key={item.id}
                          className={`grid grid-cols-10 gap-2 px-4 py-3 border-b hover:bg-muted/50 cursor-pointer transition-colors ${
                            selectedAfericao?.id === item.id ? "bg-amber-50 border-l-4 border-l-amber-500" : ""
                          }`}
                          onClick={() => setSelectedAfericao(item)}
                        >
                          <div className="text-sm font-mono">{item.pbs}</div>
                          <div className="col-span-2 text-sm font-medium truncate">{item.descricao}</div>
                          <div className="text-sm text-right">{item.qtdAnterior}</div>
                          <div className="text-sm text-right font-medium text-blue-600">+{item.qtdAferida}</div>
                          <div className="text-sm text-right">{item.qtdAtual}</div>
                          <div className="text-sm text-right text-muted-foreground">
                            {formatPercent(item.avancoAnterior)}
                          </div>
                          <div className="text-sm text-right font-medium">{formatPercent(item.avancoAtual)}</div>
                          <div className="text-sm text-right text-emerald-600">+{formatPercent(item.contribuicao)}</div>
                          <div className="text-center">
                            <Badge
                              variant={item.status === "aprovado" ? "default" : "secondary"}
                              className={item.status === "aprovado" ? "bg-green-600" : "bg-amber-500"}
                            >
                              {item.status === "aprovado" ? (
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                              ) : (
                                <Clock className="h-3 w-3 mr-1" />
                              )}
                              {item.status === "aprovado" ? "OK" : "Pend"}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </ScrollArea>
                  </CardContent>
                </Card>

                {/* Painel de Detalhes */}
                {selectedAfericao && (
                  <Card className="w-96">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">Detalhes</CardTitle>
                        <Badge
                          variant={selectedAfericao.status === "aprovado" ? "default" : "secondary"}
                          className={selectedAfericao.status === "aprovado" ? "bg-green-600" : "bg-amber-500"}
                        >
                          {selectedAfericao.status === "aprovado" ? "Aprovado" : "Pendente"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Layers className="h-4 w-4 text-amber-600" />
                        <span className="font-mono">{selectedAfericao.pbs}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Descricao</p>
                        <p className="font-medium">{selectedAfericao.descricao}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Peso Item</p>
                          <p className="font-medium">{formatPercent(selectedAfericao.pesoItem)}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Unidade</p>
                          <p>{selectedAfericao.unidade}</p>
                        </div>
                      </div>

                      <div className="border-t pt-4">
                        <h4 className="font-medium mb-3">Quantidades</h4>
                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div className="p-2 bg-muted rounded">
                            <p className="text-xs text-muted-foreground">Anterior</p>
                            <p className="font-medium">{selectedAfericao.qtdAnterior}</p>
                          </div>
                          <div className="p-2 bg-blue-100 rounded">
                            <p className="text-xs text-blue-600">Aferido</p>
                            <p className="font-bold text-blue-600">+{selectedAfericao.qtdAferida}</p>
                          </div>
                          <div className="p-2 bg-green-100 rounded">
                            <p className="text-xs text-green-600">Atual</p>
                            <p className="font-bold text-green-600">{selectedAfericao.qtdAtual}</p>
                          </div>
                        </div>
                      </div>

                      <div className="border-t pt-4">
                        <h4 className="font-medium mb-3">Avanco</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Anterior</span>
                            <span>{formatPercent(selectedAfericao.avancoAnterior)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Periodo</span>
                            <span className="text-blue-600">+{formatPercent(selectedAfericao.avancoPeriodo)}</span>
                          </div>
                          <div className="flex justify-between text-sm font-medium">
                            <span>Atual</span>
                            <span className="text-green-600">{formatPercent(selectedAfericao.avancoAtual)}</span>
                          </div>
                          <Progress value={selectedAfericao.avancoAtual} className="mt-2" />
                        </div>
                      </div>

                      <div className="border-t pt-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Contribuicao Geral</span>
                          <span className="font-bold text-emerald-600">
                            +{formatPercent(selectedAfericao.contribuicao)}
                          </span>
                        </div>
                      </div>

                      <div className="border-t pt-4 space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Responsavel</span>
                          <span>{selectedAfericao.responsavel}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Data</span>
                          <span>{format(new Date(selectedAfericao.dataAfericao), "dd/MM/yyyy", { locale: ptBR })}</span>
                        </div>
                      </div>

                      {selectedAfericao.status === "pendente" && (
                        <div className="flex gap-2 pt-2">
                          <Button variant="outline" className="flex-1 bg-transparent">
                            Reprovar
                          </Button>
                          <Button className="flex-1 bg-green-600 hover:bg-green-700">
                            <CheckCircle2 className="h-4 w-4 mr-2" />
                            Aprovar
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="historico">
              <Card>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground text-center py-8">Historico de afericoes em desenvolvimento</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pendentes">
              <Card>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground text-center py-8">Lista de pendentes em desenvolvimento</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="grafico">
              <Card>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground text-center py-8">Grafico de evolucao em desenvolvimento</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </TooltipProvider>
  )
}
