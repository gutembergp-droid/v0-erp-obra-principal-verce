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
import { ScrollArea } from "@/components/ui/scroll-area"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Switch } from "@/components/ui/switch"
import {
  ArrowLeft,
  Search,
  ChevronRight,
  ChevronDown,
  Plus,
  Edit,
  Link2,
  Layers,
  Target,
  TrendingUp,
  Download,
  Upload,
  Calculator,
  GitBranch,
  Copy,
  Trash2,
  MoreVertical,
  Package,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Dados do PDS/PBS
const pdsData = [
  {
    id: "1",
    codigo: "PBS-01",
    descricao: "SERVICOS PRELIMINARES",
    tipo: "grupo",
    unidade: "VB",
    qtdPrevista: 1,
    qtdRealizada: 1,
    peso: 3.87,
    avanco: 100,
    vinculoEAP: "01",
    regraCalculo: "soma_filhos",
    filhos: [
      {
        id: "1.1",
        codigo: "PBS-01.01",
        descricao: "Canteiro de Obras",
        tipo: "servico",
        unidade: "VB",
        qtdPrevista: 1,
        qtdRealizada: 1,
        peso: 2.05,
        avanco: 100,
        vinculoEAP: "01.01",
        regraCalculo: "avanco_direto",
        filhos: [],
      },
      {
        id: "1.2",
        codigo: "PBS-01.02",
        descricao: "Mobilizacao",
        tipo: "servico",
        unidade: "VB",
        qtdPrevista: 1,
        qtdRealizada: 1,
        peso: 1.82,
        avanco: 100,
        vinculoEAP: "01.02",
        regraCalculo: "avanco_direto",
        filhos: [],
      },
    ],
  },
  {
    id: "2",
    codigo: "PBS-02",
    descricao: "INFRAESTRUTURA",
    tipo: "grupo",
    unidade: "VB",
    qtdPrevista: 1,
    qtdRealizada: 0.85,
    peso: 20.5,
    avanco: 85,
    vinculoEAP: "02",
    regraCalculo: "media_ponderada",
    filhos: [
      {
        id: "2.1",
        codigo: "PBS-02.01",
        descricao: "Fundacoes Diretas",
        tipo: "servico",
        unidade: "M3",
        qtdPrevista: 1200,
        qtdRealizada: 1200,
        peso: 8.2,
        avanco: 100,
        vinculoEAP: "02.01",
        regraCalculo: "qtd_executada",
        filhos: [],
      },
      {
        id: "2.2",
        codigo: "PBS-02.02",
        descricao: "Fundacoes Profundas",
        tipo: "grupo",
        unidade: "ML",
        qtdPrevista: 3500,
        qtdRealizada: 3150,
        peso: 9.55,
        avanco: 90,
        vinculoEAP: "02.02",
        regraCalculo: "media_ponderada",
        filhos: [
          {
            id: "2.2.1",
            codigo: "PBS-02.02.01",
            descricao: "Estacas HC D=60cm",
            tipo: "servico",
            unidade: "ML",
            qtdPrevista: 2000,
            qtdRealizada: 1900,
            peso: 5.47,
            avanco: 95,
            vinculoEAP: "02.02.01",
            regraCalculo: "qtd_executada",
            filhos: [],
          },
          {
            id: "2.2.2",
            codigo: "PBS-02.02.02",
            descricao: "Estacas HC D=80cm",
            tipo: "servico",
            unidade: "ML",
            qtdPrevista: 1500,
            qtdRealizada: 1250,
            peso: 4.08,
            avanco: 83,
            vinculoEAP: "02.02.02",
            regraCalculo: "qtd_executada",
            filhos: [],
          },
        ],
      },
      {
        id: "2.3",
        codigo: "PBS-02.03",
        descricao: "Blocos e Baldrames",
        tipo: "servico",
        unidade: "M3",
        qtdPrevista: 800,
        qtdRealizada: 480,
        peso: 2.73,
        avanco: 60,
        vinculoEAP: "02.03",
        regraCalculo: "qtd_executada",
        filhos: [],
      },
    ],
  },
  {
    id: "3",
    codigo: "PBS-03",
    descricao: "SUPRAESTRUTURA",
    tipo: "grupo",
    unidade: "VB",
    qtdPrevista: 1,
    qtdRealizada: 0.45,
    peso: 38.72,
    avanco: 45,
    vinculoEAP: "03",
    regraCalculo: "media_ponderada",
    filhos: [
      {
        id: "3.1",
        codigo: "PBS-03.01",
        descricao: "Pilares",
        tipo: "servico",
        unidade: "M3",
        qtdPrevista: 450,
        qtdRealizada: 270,
        peso: 12.3,
        avanco: 60,
        vinculoEAP: "03.01",
        regraCalculo: "qtd_executada",
        filhos: [],
      },
      {
        id: "3.2",
        codigo: "PBS-03.02",
        descricao: "Vigas",
        tipo: "servico",
        unidade: "M3",
        qtdPrevista: 600,
        qtdRealizada: 300,
        peso: 16.4,
        avanco: 50,
        vinculoEAP: "03.02",
        regraCalculo: "qtd_executada",
        filhos: [],
      },
      {
        id: "3.3",
        codigo: "PBS-03.03",
        descricao: "Lajes",
        tipo: "servico",
        unidade: "M2",
        qtdPrevista: 5000,
        qtdRealizada: 1250,
        peso: 10.02,
        avanco: 25,
        vinculoEAP: "03.03",
        regraCalculo: "qtd_executada",
        filhos: [],
      },
    ],
  },
  {
    id: "4",
    codigo: "PBS-04",
    descricao: "ALVENARIA E VEDACAO",
    tipo: "grupo",
    unidade: "VB",
    qtdPrevista: 1,
    qtdRealizada: 0,
    peso: 14.58,
    avanco: 0,
    vinculoEAP: "04",
    regraCalculo: "media_ponderada",
    filhos: [],
  },
  {
    id: "5",
    codigo: "PBS-05",
    descricao: "INSTALACOES ELETRICAS",
    tipo: "grupo",
    unidade: "VB",
    qtdPrevista: 1,
    qtdRealizada: 0.15,
    peso: 12.75,
    avanco: 15,
    vinculoEAP: "05",
    regraCalculo: "media_ponderada",
    filhos: [],
  },
  {
    id: "6",
    codigo: "PBS-06",
    descricao: "INSTALACOES HIDRAULICAS",
    tipo: "grupo",
    unidade: "VB",
    qtdPrevista: 1,
    qtdRealizada: 0.12,
    peso: 9.56,
    avanco: 12,
    vinculoEAP: "06",
    regraCalculo: "media_ponderada",
    filhos: [],
  },
]

// Resumo PDS
const resumoPDS = {
  totalItens: 18,
  pesoTotal: 100,
  avancoGeral: 48.5,
  previsto: 52.3,
  desvio: -3.8,
}

// Regras de calculo
const regrasCalculo = [
  { id: "avanco_direto", nome: "Avanco Direto", descricao: "% informado manualmente" },
  { id: "qtd_executada", nome: "Quantidade Executada", descricao: "Qtd Realizada / Qtd Prevista" },
  { id: "soma_filhos", nome: "Soma dos Filhos", descricao: "Soma ponderada dos itens filhos" },
  { id: "media_ponderada", nome: "Media Ponderada", descricao: "Media ponderada pelo peso dos filhos" },
  { id: "marcos", nome: "Por Marcos", descricao: "Baseado em marcos/entregas" },
]

export default function PDSPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedItems, setExpandedItems] = useState<string[]>(["1", "2", "3"])
  const [selectedItem, setSelectedItem] = useState<(typeof pdsData)[0] | null>(null)
  const [activeTab, setActiveTab] = useState("estrutura")
  const [showOnlyPendentes, setShowOnlyPendentes] = useState(false)

  const toggleExpand = (id: string) => {
    setExpandedItems((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  const getAvancoColor = (avanco: number) => {
    if (avanco >= 100) return "text-green-600"
    if (avanco >= 75) return "text-blue-600"
    if (avanco >= 50) return "text-amber-600"
    if (avanco > 0) return "text-orange-600"
    return "text-muted-foreground"
  }

  const renderPDSItem = (item: (typeof pdsData)[0], level = 0) => {
    const isExpanded = expandedItems.includes(item.id)
    const hasChildren = item.filhos && item.filhos.length > 0
    const isSelected = selectedItem?.id === item.id

    if (showOnlyPendentes && item.avanco >= 100) return null

    return (
      <div key={item.id}>
        <div
          className={`flex items-center gap-2 py-2 px-3 border-b hover:bg-muted/50 cursor-pointer transition-colors ${
            isSelected ? "bg-amber-50 border-l-4 border-l-amber-500" : ""
          }`}
          style={{ paddingLeft: `${level * 24 + 12}px` }}
          onClick={() => setSelectedItem(item)}
        >
          {hasChildren ? (
            <button
              onClick={(e) => {
                e.stopPropagation()
                toggleExpand(item.id)
              }}
              className="p-1 hover:bg-muted rounded"
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              )}
            </button>
          ) : (
            <div className="w-6" />
          )}

          <div className="flex-1 grid grid-cols-12 gap-2 items-center text-sm">
            <div className="col-span-1 font-mono text-xs text-muted-foreground">{item.codigo}</div>
            <div className="col-span-3 font-medium truncate flex items-center gap-2">
              {item.tipo === "grupo" ? (
                <Layers className="h-3.5 w-3.5 text-amber-600" />
              ) : (
                <Package className="h-3.5 w-3.5 text-blue-600" />
              )}
              {item.descricao}
            </div>
            <div className="col-span-1 text-center text-muted-foreground">{item.unidade}</div>
            <div className="col-span-1 text-right">{item.qtdPrevista.toLocaleString("pt-BR")}</div>
            <div className="col-span-1 text-right">{item.qtdRealizada.toLocaleString("pt-BR")}</div>
            <div className="col-span-1 text-center">
              <Badge variant="outline" className="text-xs">
                {item.peso.toFixed(2)}%
              </Badge>
            </div>
            <div className="col-span-2">
              <div className="flex items-center gap-2">
                <Progress value={item.avanco} className="flex-1 h-2" />
                <span className={`text-xs font-medium w-10 text-right ${getAvancoColor(item.avanco)}`}>
                  {item.avanco}%
                </span>
              </div>
            </div>
            <div className="col-span-1 text-center">
              <Badge variant="secondary" className="text-xs">
                {regrasCalculo.find((r) => r.id === item.regraCalculo)?.nome.split(" ")[0] || "Manual"}
              </Badge>
            </div>
            <div className="col-span-1 flex justify-end gap-1">
              <Link2 className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{item.vinculoEAP}</span>
            </div>
          </div>
        </div>

        {hasChildren && isExpanded && (
          <div>{item.filhos.map((filho) => renderPDSItem(filho as (typeof pdsData)[0], level + 1))}</div>
        )}
      </div>
    )
  }

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
                  <Layers className="h-5 w-5 text-amber-600" />
                  <h1 className="text-xl font-bold">PDS - Estrutura de Producao (PBS)</h1>
                </div>
                <p className="text-sm text-muted-foreground">Obra: Torre Norte - Centro Empresarial</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Importar
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
              <Button variant="outline" size="sm">
                <Calculator className="h-4 w-4 mr-2" />
                Recalcular
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Novo Item
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Novo Item do PDS/PBS</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 gap-4">
                      <div className="col-span-1">
                        <Label>Codigo PBS</Label>
                        <Input placeholder="PBS-00.00" />
                      </div>
                      <div className="col-span-3">
                        <Label>Descricao</Label>
                        <Input placeholder="Descricao do servico" />
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <Label>Tipo</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="grupo">Grupo</SelectItem>
                            <SelectItem value="servico">Servico</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Unidade</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="vb">VB</SelectItem>
                            <SelectItem value="m2">M2</SelectItem>
                            <SelectItem value="m3">M3</SelectItem>
                            <SelectItem value="ml">ML</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Qtd Prevista</Label>
                        <Input type="number" placeholder="0" />
                      </div>
                      <div>
                        <Label>Peso (%)</Label>
                        <Input type="number" placeholder="0.00" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Item Pai</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Raiz ou selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="raiz">Raiz (Nivel 1)</SelectItem>
                            <SelectItem value="PBS-01">PBS-01 - Preliminares</SelectItem>
                            <SelectItem value="PBS-02">PBS-02 - Infraestrutura</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Regra de Calculo</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            {regrasCalculo.map((regra) => (
                              <SelectItem key={regra.id} value={regra.id}>
                                {regra.nome}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label>Vincular EAP</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione item da EAP" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="01">01 - Servicos Preliminares</SelectItem>
                          <SelectItem value="02">02 - Infraestrutura</SelectItem>
                          <SelectItem value="03">03 - Supraestrutura</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Cancelar</Button>
                    <Button className="bg-amber-600 hover:bg-amber-700">Salvar</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </header>

        <div className="p-6">
          {/* Cards de Resumo */}
          <div className="grid grid-cols-5 gap-4 mb-6">
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Itens</p>
                    <p className="text-2xl font-bold">{resumoPDS.totalItens}</p>
                  </div>
                  <Layers className="h-8 w-8 text-amber-600" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">Peso total: {resumoPDS.pesoTotal}%</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avanco Geral</p>
                    <p className="text-2xl font-bold">{resumoPDS.avancoGeral}%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <Progress value={resumoPDS.avancoGeral} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Previsto</p>
                    <p className="text-2xl font-bold">{resumoPDS.previsto}%</p>
                  </div>
                  <Target className="h-8 w-8 text-blue-600" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">Conforme cronograma</p>
              </CardContent>
            </Card>

            <Card className={resumoPDS.desvio < 0 ? "border-red-200 bg-red-50" : "border-green-200 bg-green-50"}>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Desvio</p>
                    <p className={`text-2xl font-bold ${resumoPDS.desvio < 0 ? "text-red-600" : "text-green-600"}`}>
                      {resumoPDS.desvio > 0 ? "+" : ""}
                      {resumoPDS.desvio}%
                    </p>
                  </div>
                  <AlertCircle className={`h-8 w-8 ${resumoPDS.desvio < 0 ? "text-red-600" : "text-green-600"}`} />
                </div>
                <p className="text-xs text-muted-foreground mt-2">Real vs Previsto</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Vinculo EAP</p>
                    <p className="text-2xl font-bold">100%</p>
                  </div>
                  <GitBranch className="h-8 w-8 text-purple-600" />
                </div>
                <p className="text-xs text-green-600 mt-2">Todos vinculados</p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="flex items-center justify-between mb-4">
              <TabsList>
                <TabsTrigger value="estrutura">Estrutura PBS</TabsTrigger>
                <TabsTrigger value="regras">Regras de Calculo</TabsTrigger>
                <TabsTrigger value="vinculacao">Vinculacao EAP</TabsTrigger>
                <TabsTrigger value="mapa">Mapa Visual</TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Switch checked={showOnlyPendentes} onCheckedChange={setShowOnlyPendentes} />
                  <Label className="text-sm">Apenas pendentes</Label>
                </div>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar item..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <TabsContent value="estrutura" className="mt-0">
              <div className="flex gap-6">
                {/* Arvore PBS */}
                <Card className="flex-1">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">Estrutura de Producao</CardTitle>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => setExpandedItems([])}>
                          Recolher
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => setExpandedItems(pdsData.map((i) => i.id))}>
                          Expandir
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    {/* Header da Tabela */}
                    <div className="grid grid-cols-12 gap-2 px-3 py-2 bg-muted/50 border-b text-xs font-medium text-muted-foreground">
                      <div className="col-span-1 pl-8">Codigo</div>
                      <div className="col-span-3">Descricao</div>
                      <div className="col-span-1 text-center">Un</div>
                      <div className="col-span-1 text-right">Prev</div>
                      <div className="col-span-1 text-right">Real</div>
                      <div className="col-span-1 text-center">Peso</div>
                      <div className="col-span-2">Avanco</div>
                      <div className="col-span-1 text-center">Regra</div>
                      <div className="col-span-1 text-right">EAP</div>
                    </div>

                    <ScrollArea className="h-[calc(100vh-480px)]">
                      {pdsData.map((item) => renderPDSItem(item))}
                    </ScrollArea>
                  </CardContent>
                </Card>

                {/* Painel de Detalhes */}
                {selectedItem && (
                  <Card className="w-96">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">Detalhes do Item</CardTitle>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="h-4 w-4 mr-2" />
                              Duplicar
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Codigo</p>
                        <p className="font-mono">{selectedItem.codigo}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Descricao</p>
                        <p className="font-medium">{selectedItem.descricao}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Tipo</p>
                          <Badge variant={selectedItem.tipo === "grupo" ? "default" : "secondary"}>
                            {selectedItem.tipo === "grupo" ? "Grupo" : "Servico"}
                          </Badge>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Unidade</p>
                          <p>{selectedItem.unidade}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Qtd Prevista</p>
                          <p className="font-medium">{selectedItem.qtdPrevista.toLocaleString("pt-BR")}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Qtd Realizada</p>
                          <p className="font-medium">{selectedItem.qtdRealizada.toLocaleString("pt-BR")}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-2">Avanco</p>
                        <div className="flex items-center gap-3">
                          <Progress value={selectedItem.avanco} className="flex-1" />
                          <span className={`font-bold ${getAvancoColor(selectedItem.avanco)}`}>
                            {selectedItem.avanco}%
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Peso</p>
                          <p className="font-medium">{selectedItem.peso.toFixed(2)}%</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Regra Calculo</p>
                          <Badge variant="outline">
                            {regrasCalculo.find((r) => r.id === selectedItem.regraCalculo)?.nome || "Manual"}
                          </Badge>
                        </div>
                      </div>
                      <div className="border-t pt-4">
                        <p className="text-sm font-medium text-muted-foreground mb-2">Vinculacao</p>
                        <div className="flex items-center gap-2 p-2 bg-muted rounded">
                          <GitBranch className="h-4 w-4 text-purple-600" />
                          <span className="text-sm">EAP: {selectedItem.vinculoEAP}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button variant="outline" className="flex-1 bg-transparent" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </Button>
                        <Button className="flex-1 bg-amber-600 hover:bg-amber-700" size="sm">
                          <Calculator className="h-4 w-4 mr-2" />
                          Aferir
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="regras">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Regras de Calculo de Avanco</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {regrasCalculo.map((regra) => (
                      <Card key={regra.id} className="border">
                        <CardContent className="pt-4">
                          <div className="flex items-start gap-3">
                            <Calculator className="h-5 w-5 text-amber-600 mt-0.5" />
                            <div>
                              <h4 className="font-medium">{regra.nome}</h4>
                              <p className="text-sm text-muted-foreground">{regra.descricao}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="vinculacao">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Mapa de Vinculacao PBS x EAP</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-medium mb-3 flex items-center gap-2">
                        <Layers className="h-4 w-4 text-amber-600" />
                        PBS (Producao)
                      </h4>
                      <div className="space-y-2">
                        {pdsData.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between p-2 bg-amber-50 rounded border border-amber-200"
                          >
                            <span className="text-sm">{item.codigo}</span>
                            <span className="text-xs text-muted-foreground truncate max-w-40">{item.descricao}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-3 flex items-center gap-2">
                        <GitBranch className="h-4 w-4 text-orange-600" />
                        EAP (Custo)
                      </h4>
                      <div className="space-y-2">
                        {pdsData.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between p-2 bg-orange-50 rounded border border-orange-200"
                          >
                            <span className="text-sm">{item.vinculoEAP}</span>
                            <span className="text-xs text-muted-foreground truncate max-w-40">{item.descricao}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="mapa">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Mapa Visual de Avanco</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-6 gap-3">
                    {pdsData.map((item) => (
                      <div
                        key={item.id}
                        className={`p-4 rounded-lg border-2 ${
                          item.avanco >= 100
                            ? "bg-green-50 border-green-300"
                            : item.avanco >= 50
                              ? "bg-blue-50 border-blue-300"
                              : item.avanco > 0
                                ? "bg-amber-50 border-amber-300"
                                : "bg-gray-50 border-gray-300"
                        }`}
                      >
                        <p className="text-xs font-mono text-muted-foreground">{item.codigo}</p>
                        <p className="text-sm font-medium truncate">{item.descricao}</p>
                        <div className="mt-2">
                          <Progress value={item.avanco} className="h-2" />
                          <p className="text-xs text-center mt-1 font-medium">{item.avanco}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </TooltipProvider>
  )
}
