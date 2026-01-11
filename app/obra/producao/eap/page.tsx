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
import { ObraProducaoNavbar } from "../../_components/obra-producao-navbar"
import { Textarea } from "@/components/ui/textarea"
import { TooltipProvider } from "@/components/ui/tooltip"
import {
  ArrowLeft,
  Search,
  Filter,
  ChevronRight,
  ChevronDown,
  Plus,
  Edit,
  Lock,
  Unlock,
  Link2,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Clock,
  BarChart3,
  TreePine,
  Layers,
  Target,
  TrendingUp,
  Eye,
  Download,
  Upload,
  Settings,
  RefreshCw,
} from "lucide-react"
import Link from "next/link"

// Dados da EAP
const eapData = [
  {
    id: "1",
    codigo: "01",
    descricao: "SERVICOS PRELIMINARES",
    unidade: "VB",
    qtdOrcada: 1,
    qtdRealizada: 1,
    valorOrcado: 850000,
    valorRealizado: 820000,
    avanco: 100,
    status: "concluido",
    bloqueio: null,
    vinculoPBS: "PBS-01",
    filhos: [
      {
        id: "1.1",
        codigo: "01.01",
        descricao: "Canteiro de Obras",
        unidade: "VB",
        qtdOrcada: 1,
        qtdRealizada: 1,
        valorOrcado: 450000,
        valorRealizado: 435000,
        avanco: 100,
        status: "concluido",
        bloqueio: null,
        vinculoPBS: "PBS-01.01",
        filhos: [],
      },
      {
        id: "1.2",
        codigo: "01.02",
        descricao: "Mobilizacao",
        unidade: "VB",
        qtdOrcada: 1,
        qtdRealizada: 1,
        valorOrcado: 400000,
        valorRealizado: 385000,
        avanco: 100,
        status: "concluido",
        bloqueio: null,
        vinculoPBS: "PBS-01.02",
        filhos: [],
      },
    ],
  },
  {
    id: "2",
    codigo: "02",
    descricao: "INFRAESTRUTURA",
    unidade: "VB",
    qtdOrcada: 1,
    qtdRealizada: 0.85,
    valorOrcado: 4500000,
    valorRealizado: 3825000,
    avanco: 85,
    status: "em_andamento",
    bloqueio: null,
    vinculoPBS: "PBS-02",
    filhos: [
      {
        id: "2.1",
        codigo: "02.01",
        descricao: "Fundacoes Diretas",
        unidade: "M3",
        qtdOrcada: 1200,
        qtdRealizada: 1200,
        valorOrcado: 1800000,
        valorRealizado: 1750000,
        avanco: 100,
        status: "concluido",
        bloqueio: null,
        vinculoPBS: "PBS-02.01",
        filhos: [],
      },
      {
        id: "2.2",
        codigo: "02.02",
        descricao: "Fundacoes Profundas - Estacas",
        unidade: "ML",
        qtdOrcada: 3500,
        qtdRealizada: 3150,
        valorOrcado: 2100000,
        valorRealizado: 1890000,
        avanco: 90,
        status: "em_andamento",
        bloqueio: null,
        vinculoPBS: "PBS-02.02",
        filhos: [
          {
            id: "2.2.1",
            codigo: "02.02.01",
            descricao: "Estacas Helice Continua D=60cm",
            unidade: "ML",
            qtdOrcada: 2000,
            qtdRealizada: 1900,
            valorOrcado: 1200000,
            valorRealizado: 1140000,
            avanco: 95,
            status: "em_andamento",
            bloqueio: null,
            vinculoPBS: "PBS-02.02.01",
            filhos: [],
          },
          {
            id: "2.2.2",
            codigo: "02.02.02",
            descricao: "Estacas Helice Continua D=80cm",
            unidade: "ML",
            qtdOrcada: 1500,
            qtdRealizada: 1250,
            valorOrcado: 900000,
            valorRealizado: 750000,
            avanco: 83,
            status: "em_andamento",
            bloqueio: null,
            vinculoPBS: "PBS-02.02.02",
            filhos: [],
          },
        ],
      },
      {
        id: "2.3",
        codigo: "02.03",
        descricao: "Blocos e Baldrames",
        unidade: "M3",
        qtdOrcada: 800,
        qtdRealizada: 480,
        valorOrcado: 600000,
        valorRealizado: 360000,
        avanco: 60,
        status: "em_andamento",
        bloqueio: null,
        vinculoPBS: "PBS-02.03",
        filhos: [],
      },
    ],
  },
  {
    id: "3",
    codigo: "03",
    descricao: "SUPRAESTRUTURA",
    unidade: "VB",
    qtdOrcada: 1,
    qtdRealizada: 0.45,
    valorOrcado: 8500000,
    valorRealizado: 3825000,
    avanco: 45,
    status: "em_andamento",
    bloqueio: null,
    vinculoPBS: "PBS-03",
    filhos: [
      {
        id: "3.1",
        codigo: "03.01",
        descricao: "Pilares",
        unidade: "M3",
        qtdOrcada: 450,
        qtdRealizada: 270,
        valorOrcado: 2700000,
        valorRealizado: 1620000,
        avanco: 60,
        status: "em_andamento",
        bloqueio: null,
        vinculoPBS: "PBS-03.01",
        filhos: [],
      },
      {
        id: "3.2",
        codigo: "03.02",
        descricao: "Vigas",
        unidade: "M3",
        qtdOrcada: 600,
        qtdRealizada: 300,
        valorOrcado: 3600000,
        valorRealizado: 1800000,
        avanco: 50,
        status: "em_andamento",
        bloqueio: null,
        vinculoPBS: "PBS-03.02",
        filhos: [],
      },
      {
        id: "3.3",
        codigo: "03.03",
        descricao: "Lajes",
        unidade: "M2",
        qtdOrcada: 5000,
        qtdRealizada: 1250,
        valorOrcado: 2200000,
        valorRealizado: 550000,
        avanco: 25,
        status: "em_andamento",
        bloqueio: "parcial",
        vinculoPBS: "PBS-03.03",
        filhos: [],
      },
    ],
  },
  {
    id: "4",
    codigo: "04",
    descricao: "ALVENARIA E VEDACAO",
    unidade: "VB",
    qtdOrcada: 1,
    qtdRealizada: 0,
    valorOrcado: 3200000,
    valorRealizado: 0,
    avanco: 0,
    status: "bloqueado",
    bloqueio: "total",
    vinculoPBS: "PBS-04",
    filhos: [],
  },
  {
    id: "5",
    codigo: "05",
    descricao: "INSTALACOES ELETRICAS",
    unidade: "VB",
    qtdOrcada: 1,
    qtdRealizada: 0.15,
    valorOrcado: 2800000,
    valorRealizado: 420000,
    avanco: 15,
    status: "em_andamento",
    bloqueio: null,
    vinculoPBS: "PBS-05",
    filhos: [],
  },
  {
    id: "6",
    codigo: "06",
    descricao: "INSTALACOES HIDRAULICAS",
    unidade: "VB",
    qtdOrcada: 1,
    qtdRealizada: 0.12,
    valorOrcado: 2100000,
    valorRealizado: 252000,
    avanco: 12,
    status: "em_andamento",
    bloqueio: null,
    vinculoPBS: "PBS-06",
    filhos: [],
  },
]

// Resumo EAP
const resumoEAP = {
  totalItens: 24,
  itensConcluidos: 5,
  itensEmAndamento: 16,
  itensBloqueados: 3,
  avancoGeral: 48.5,
  valorOrcado: 21950000,
  valorRealizado: 9142000,
}

export default function EAPPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedItems, setExpandedItems] = useState<string[]>(["1", "2", "3"])
  const [selectedItem, setSelectedItem] = useState<(typeof eapData)[0] | null>(null)
  const [activeTab, setActiveTab] = useState("arvore")
  const [filtroStatus, setFiltroStatus] = useState("todos")

  const toggleExpand = (id: string) => {
    setExpandedItems((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  const getStatusBadge = (status: string, bloqueio: string | null) => {
    if (bloqueio === "total") {
      return (
        <Badge variant="destructive" className="gap-1">
          <Lock className="h-3 w-3" />
          Bloqueado
        </Badge>
      )
    }
    if (bloqueio === "parcial") {
      return (
        <Badge className="bg-amber-500 gap-1">
          <AlertTriangle className="h-3 w-3" />
          Bloq. Parcial
        </Badge>
      )
    }
    switch (status) {
      case "concluido":
        return (
          <Badge className="bg-green-600 gap-1">
            <CheckCircle2 className="h-3 w-3" />
            Concluido
          </Badge>
        )
      case "em_andamento":
        return (
          <Badge className="bg-blue-600 gap-1">
            <Clock className="h-3 w-3" />
            Em Andamento
          </Badge>
        )
      default:
        return <Badge variant="secondary">Pendente</Badge>
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const renderEAPItem = (item: (typeof eapData)[0], level = 0) => {
    const isExpanded = expandedItems.includes(item.id)
    const hasChildren = item.filhos && item.filhos.length > 0
    const isSelected = selectedItem?.id === item.id

    // Filtro por status
    if (filtroStatus !== "todos") {
      if (filtroStatus === "bloqueado" && item.bloqueio !== "total" && item.bloqueio !== "parcial") return null
      if (filtroStatus === "concluido" && item.status !== "concluido") return null
      if (filtroStatus === "em_andamento" && item.status !== "em_andamento") return null
    }

    // Filtro por busca
    if (
      searchTerm &&
      !item.descricao.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !item.codigo.includes(searchTerm)
    ) {
      return null
    }

    return (
      <div key={item.id}>
        <div
          className={`flex items-center gap-2 py-2 px-3 border-b hover:bg-muted/50 cursor-pointer transition-colors ${
            isSelected ? "bg-orange-50 border-l-4 border-l-orange-500" : ""
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
              {item.descricao}
              {item.bloqueio && <Lock className="h-3 w-3 text-red-500" />}
            </div>
            <div className="col-span-1 text-center text-muted-foreground">{item.unidade}</div>
            <div className="col-span-1 text-right">{item.qtdOrcada.toLocaleString("pt-BR")}</div>
            <div className="col-span-1 text-right">{item.qtdRealizada.toLocaleString("pt-BR")}</div>
            <div className="col-span-2">
              <div className="flex items-center gap-2">
                <Progress value={item.avanco} className="flex-1 h-2" />
                <span className="text-xs font-medium w-10 text-right">{item.avanco}%</span>
              </div>
            </div>
            <div className="col-span-2 text-right text-xs">{formatCurrency(item.valorRealizado)}</div>
            <div className="col-span-1 flex justify-end">{getStatusBadge(item.status, item.bloqueio)}</div>
          </div>
        </div>

        {hasChildren && isExpanded && (
          <div>{item.filhos.map((filho) => renderEAPItem(filho as (typeof eapData)[0], level + 1))}</div>
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
                  <TreePine className="h-5 w-5 text-orange-600" />
                  <h1 className="text-xl font-bold">EAP - Estrutura Analitica do Projeto</h1>
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
                <RefreshCw className="h-4 w-4 mr-2" />
                Sincronizar PBS
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Novo Item
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Novo Item da EAP</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 gap-4">
                      <div className="col-span-1">
                        <Label>Codigo</Label>
                        <Input placeholder="00.00.00" />
                      </div>
                      <div className="col-span-3">
                        <Label>Descricao</Label>
                        <Input placeholder="Descricao do servico" />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
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
                            <SelectItem value="kg">KG</SelectItem>
                            <SelectItem value="un">UN</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Quantidade Orcada</Label>
                        <Input type="number" placeholder="0" />
                      </div>
                      <div>
                        <Label>Valor Orcado</Label>
                        <Input placeholder="R$ 0,00" />
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
                            <SelectItem value="01">01 - Servicos Preliminares</SelectItem>
                            <SelectItem value="02">02 - Infraestrutura</SelectItem>
                            <SelectItem value="03">03 - Supraestrutura</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Vincular PBS</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione PBS" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pbs-01">PBS-01 - Preliminares</SelectItem>
                            <SelectItem value="pbs-02">PBS-02 - Infraestrutura</SelectItem>
                            <SelectItem value="pbs-03">PBS-03 - Supraestrutura</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label>Observacoes</Label>
                      <Textarea placeholder="Observacoes sobre o item..." />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Cancelar</Button>
                    <Button className="bg-orange-600 hover:bg-orange-700">Salvar</Button>
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
                    <p className="text-2xl font-bold">{resumoEAP.totalItens}</p>
                  </div>
                  <Layers className="h-8 w-8 text-orange-600" />
                </div>
                <div className="flex gap-2 mt-2 text-xs">
                  <span className="text-green-600">{resumoEAP.itensConcluidos} concluidos</span>
                  <span className="text-muted-foreground">|</span>
                  <span className="text-blue-600">{resumoEAP.itensEmAndamento} andamento</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avanco Geral</p>
                    <p className="text-2xl font-bold">{resumoEAP.avancoGeral}%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <Progress value={resumoEAP.avancoGeral} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Valor Orcado</p>
                    <p className="text-2xl font-bold">R$ 21,9M</p>
                  </div>
                  <Target className="h-8 w-8 text-blue-600" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">Base contratual</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Valor Realizado</p>
                    <p className="text-2xl font-bold">R$ 9,1M</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-emerald-600" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">41.6% do orcado</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Bloqueados</p>
                    <p className="text-2xl font-bold text-red-600">{resumoEAP.itensBloqueados}</p>
                  </div>
                  <Lock className="h-8 w-8 text-red-600" />
                </div>
                <p className="text-xs text-red-600 mt-2">Aguardando liberacao</p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="arvore" className="gap-2">
                  <TreePine className="h-4 w-4" />
                  Arvore EAP
                </TabsTrigger>
                <TabsTrigger value="lista" className="gap-2">
                  <Layers className="h-4 w-4" />
                  Lista Completa
                </TabsTrigger>
                <TabsTrigger value="bloqueios" className="gap-2">
                  <Lock className="h-4 w-4" />
                  Gestao de Bloqueios
                </TabsTrigger>
                <TabsTrigger value="vinculos" className="gap-2">
                  <Link2 className="h-4 w-4" />
                  Vinculos PBS
                </TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por codigo ou descricao..."
                    className="pl-9 w-80"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={filtroStatus} onValueChange={setFiltroStatus}>
                  <SelectTrigger className="w-40">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="em_andamento">Em Andamento</SelectItem>
                    <SelectItem value="concluido">Concluidos</SelectItem>
                    <SelectItem value="bloqueado">Bloqueados</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <TabsContent value="arvore" className="space-y-4">
              <div className="flex gap-6">
                {/* Arvore EAP */}
                <Card className="flex-1">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">Estrutura Analitica</CardTitle>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => setExpandedItems(eapData.map((i) => i.id))}>
                          Expandir Todos
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => setExpandedItems([])}>
                          Recolher Todos
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    {/* Cabecalho da tabela */}
                    <div className="grid grid-cols-12 gap-2 px-3 py-2 bg-muted/50 text-xs font-medium text-muted-foreground border-b">
                      <div className="col-span-1 pl-8">Codigo</div>
                      <div className="col-span-3">Descricao</div>
                      <div className="col-span-1 text-center">Unid.</div>
                      <div className="col-span-1 text-right">Qtd. Orc.</div>
                      <div className="col-span-1 text-right">Qtd. Real.</div>
                      <div className="col-span-2">Avanco</div>
                      <div className="col-span-2 text-right">Valor Real.</div>
                      <div className="col-span-1 text-right">Status</div>
                    </div>

                    <div className="max-h-[500px] overflow-y-auto">{eapData.map((item) => renderEAPItem(item))}</div>
                  </CardContent>
                </Card>

                {/* Painel de Detalhes */}
                {selectedItem && (
                  <Card className="w-96">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">Detalhes do Item</CardTitle>
                        <Button variant="ghost" size="icon" onClick={() => setSelectedItem(null)}>
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="font-mono">
                          {selectedItem.codigo}
                        </Badge>
                        {getStatusBadge(selectedItem.status, selectedItem.bloqueio)}
                      </div>

                      <div>
                        <h3 className="font-semibold text-lg">{selectedItem.descricao}</h3>
                        <p className="text-sm text-muted-foreground">Unidade: {selectedItem.unidade}</p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Avanco</span>
                          <span className="font-medium">{selectedItem.avanco}%</span>
                        </div>
                        <Progress value={selectedItem.avanco} className="h-3" />
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="space-y-1">
                          <p className="text-muted-foreground">Qtd. Orcada</p>
                          <p className="font-semibold">{selectedItem.qtdOrcada.toLocaleString("pt-BR")}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-muted-foreground">Qtd. Realizada</p>
                          <p className="font-semibold">{selectedItem.qtdRealizada.toLocaleString("pt-BR")}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-muted-foreground">Valor Orcado</p>
                          <p className="font-semibold">{formatCurrency(selectedItem.valorOrcado)}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-muted-foreground">Valor Realizado</p>
                          <p className="font-semibold">{formatCurrency(selectedItem.valorRealizado)}</p>
                        </div>
                      </div>

                      {selectedItem.vinculoPBS && (
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <div className="flex items-center gap-2 text-sm">
                            <Link2 className="h-4 w-4 text-blue-600" />
                            <span className="text-muted-foreground">Vinculo PBS:</span>
                            <span className="font-medium text-blue-600">{selectedItem.vinculoPBS}</span>
                          </div>
                        </div>
                      )}

                      {selectedItem.bloqueio && (
                        <div className="p-3 bg-red-50 rounded-lg">
                          <div className="flex items-center gap-2 text-sm text-red-600">
                            <Lock className="h-4 w-4" />
                            <span className="font-medium">
                              {selectedItem.bloqueio === "total" ? "Bloqueio Total" : "Bloqueio Parcial"}
                            </span>
                          </div>
                          <p className="text-xs text-red-600 mt-1">Aguardando liberacao do Planejamento</p>
                        </div>
                      )}

                      <div className="flex flex-col gap-2 pt-2">
                        <Button variant="outline" size="sm" className="justify-start gap-2 bg-transparent">
                          <Edit className="h-4 w-4" />
                          Editar Item
                        </Button>
                        <Button variant="outline" size="sm" className="justify-start gap-2 bg-transparent">
                          <Eye className="h-4 w-4" />
                          Ver Composicao
                        </Button>
                        <Button variant="outline" size="sm" className="justify-start gap-2 bg-transparent">
                          <FileText className="h-4 w-4" />
                          Historico de Medicoes
                        </Button>
                        {selectedItem.bloqueio ? (
                          <Button
                            variant="outline"
                            size="sm"
                            className="justify-start gap-2 text-green-600 hover:text-green-700 bg-transparent"
                          >
                            <Unlock className="h-4 w-4" />
                            Solicitar Desbloqueio
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            className="justify-start gap-2 text-red-600 hover:text-red-700 bg-transparent"
                          >
                            <Lock className="h-4 w-4" />
                            Bloquear Item
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="lista">
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-muted-foreground py-8">
                    Visualizacao em lista com todos os itens expandidos
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="bloqueios">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Gestao de Bloqueios</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Bloqueio Total */}
                    <div className="p-4 border rounded-lg bg-red-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Lock className="h-5 w-5 text-red-600" />
                          <div>
                            <p className="font-medium">04 - Alvenaria e Vedacao</p>
                            <p className="text-sm text-muted-foreground">
                              Bloqueio Total - Aguardando conclusao da supraestrutura
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="destructive">Total</Badge>
                          <Button size="sm" variant="outline">
                            <Unlock className="h-4 w-4 mr-2" />
                            Liberar
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Bloqueio Parcial */}
                    <div className="p-4 border rounded-lg bg-amber-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <AlertTriangle className="h-5 w-5 text-amber-600" />
                          <div>
                            <p className="font-medium">03.03 - Lajes</p>
                            <p className="text-sm text-muted-foreground">
                              Bloqueio Parcial - Sob demanda conforme cronograma
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-amber-500">Parcial</Badge>
                          <Button size="sm" variant="outline">
                            <Settings className="h-4 w-4 mr-2" />
                            Configurar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="vinculos">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Vinculos EAP x PBS</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground py-8">Mapeamento de vinculacao entre EAP e PBS</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </TooltipProvider>
  )
}
