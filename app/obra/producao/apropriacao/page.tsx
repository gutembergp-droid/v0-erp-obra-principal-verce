"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
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
  Users,
  Wrench,
  Package,
  DollarSign,
  CalendarIcon,
  FileText,
  BarChart3,
  Save,
  Send,
  Calculator,
} from "lucide-react"
import Link from "next/link"

// Dados de apropriacao
const apropriacoes = [
  {
    id: "1",
    data: "2024-01-15",
    servico: "Concretagem Pilares P1 a P10",
    eap: "03.01",
    pbs: "PBS-03.01",
    qtdPrevista: 45,
    qtdApropriada: 42,
    unidade: "M3",
    status: "aprovado",
    recursos: {
      maoDeObra: [
        { nome: "Pedreiro", qtd: 8, horasTrab: 64, custoUnit: 35, custoTotal: 2240 },
        { nome: "Servente", qtd: 4, horasTrab: 32, custoUnit: 22, custoTotal: 704 },
        { nome: "Armador", qtd: 6, horasTrab: 48, custoUnit: 38, custoTotal: 1824 },
      ],
      equipamentos: [
        { nome: "Bomba de Concreto", qtd: 1, horasUso: 6, custoUnit: 450, custoTotal: 2700 },
        { nome: "Vibrador", qtd: 2, horasUso: 6, custoUnit: 25, custoTotal: 300 },
      ],
      materiais: [
        { nome: "Concreto FCK 30", qtd: 42, unidade: "M3", custoUnit: 380, custoTotal: 15960 },
        { nome: "Aco CA-50", qtd: 3200, unidade: "KG", custoUnit: 5.8, custoTotal: 18560 },
      ],
    },
    custoTotal: 42288,
    custoOrcado: 45000,
    desvio: -6.03,
  },
  {
    id: "2",
    data: "2024-01-15",
    servico: "Forma para Vigas V1 a V8",
    eap: "03.02",
    pbs: "PBS-03.02",
    qtdPrevista: 120,
    qtdApropriada: 115,
    unidade: "M2",
    status: "pendente",
    recursos: {
      maoDeObra: [
        { nome: "Carpinteiro", qtd: 6, horasTrab: 48, custoUnit: 40, custoTotal: 1920 },
        { nome: "Ajudante", qtd: 3, horasTrab: 24, custoUnit: 22, custoTotal: 528 },
      ],
      equipamentos: [{ nome: "Serra Circular", qtd: 2, horasUso: 8, custoUnit: 15, custoTotal: 240 }],
      materiais: [
        { nome: "Compensado Plastificado", qtd: 60, unidade: "UN", custoUnit: 85, custoTotal: 5100 },
        { nome: "Pontalete", qtd: 200, unidade: "ML", custoUnit: 8, custoTotal: 1600 },
        { nome: "Prego", qtd: 20, unidade: "KG", custoUnit: 12, custoTotal: 240 },
      ],
    },
    custoTotal: 9628,
    custoOrcado: 10500,
    desvio: -8.3,
  },
  {
    id: "3",
    data: "2024-01-14",
    servico: "Estacas Helice Continua",
    eap: "02.02.01",
    pbs: "PBS-02.02.01",
    qtdPrevista: 150,
    qtdApropriada: 145,
    unidade: "ML",
    status: "aprovado",
    recursos: {
      maoDeObra: [
        { nome: "Operador", qtd: 2, horasTrab: 16, custoUnit: 55, custoTotal: 880 },
        { nome: "Ajudante", qtd: 4, horasTrab: 32, custoUnit: 22, custoTotal: 704 },
      ],
      equipamentos: [
        { nome: "Perfuratriz HC", qtd: 1, horasUso: 8, custoUnit: 1200, custoTotal: 9600 },
        { nome: "Betoneira", qtd: 1, horasUso: 8, custoUnit: 80, custoTotal: 640 },
      ],
      materiais: [
        { nome: "Concreto FCK 25", qtd: 35, unidade: "M3", custoUnit: 350, custoTotal: 12250 },
        { nome: "Aco CA-50", qtd: 2500, unidade: "KG", custoUnit: 5.8, custoTotal: 14500 },
      ],
    },
    custoTotal: 38574,
    custoOrcado: 42000,
    desvio: -8.16,
  },
]

// Resumo
const resumoApropriacao = {
  totalDia: 3,
  custoTotalDia: 90490,
  custoOrcadoDia: 97500,
  desvioDia: -7.19,
  pendentes: 1,
  aprovados: 2,
}

// Servicos disponiveis
const servicosDisponiveis = [
  { id: "03.01", nome: "Pilares", unidade: "M3" },
  { id: "03.02", nome: "Vigas", unidade: "M3" },
  { id: "03.03", nome: "Lajes", unidade: "M2" },
  { id: "02.03", nome: "Blocos e Baldrames", unidade: "M3" },
]

export default function ApropriacaoPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedApropriacao, setSelectedApropriacao] = useState<(typeof apropriacoes)[0] | null>(null)
  const [activeTab, setActiveTab] = useState("diario")
  const [dataSelecionada, setDataSelecionada] = useState<Date>(new Date())
  const [filtroStatus, setFiltroStatus] = useState("todos")

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
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
                  <Calculator className="h-5 w-5 text-amber-600" />
                  <h1 className="text-xl font-bold">Apropriacao de Custos</h1>
                </div>
                <p className="text-sm text-muted-foreground">Obra: Torre Norte - Centro Empresarial</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    {format(dataSelecionada, "dd/MM/yyyy", { locale: ptBR })}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    mode="single"
                    selected={dataSelecionada}
                    onSelect={(date) => date && setDataSelecionada(date)}
                    locale={ptBR}
                  />
                </PopoverContent>
              </Popover>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Nova Apropriacao
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Nova Apropriacao de Custo</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label>Data</Label>
                        <Input type="date" defaultValue={format(new Date(), "yyyy-MM-dd")} />
                      </div>
                      <div className="col-span-2">
                        <Label>Servico (EAP)</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o servico" />
                          </SelectTrigger>
                          <SelectContent>
                            {servicosDisponiveis.map((s) => (
                              <SelectItem key={s.id} value={s.id}>
                                {s.id} - {s.nome} ({s.unidade})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label>Qtd Prevista</Label>
                        <Input type="number" placeholder="0" />
                      </div>
                      <div>
                        <Label>Qtd Apropriada</Label>
                        <Input type="number" placeholder="0" />
                      </div>
                      <div>
                        <Label>Unidade</Label>
                        <Input disabled value="M3" />
                      </div>
                    </div>

                    {/* Mao de Obra */}
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium flex items-center gap-2">
                          <Users className="h-4 w-4 text-blue-600" />
                          Mao de Obra
                        </h4>
                        <Button variant="outline" size="sm">
                          <Plus className="h-4 w-4 mr-1" />
                          Adicionar
                        </Button>
                      </div>
                      <div className="grid grid-cols-5 gap-2 text-sm font-medium text-muted-foreground mb-2">
                        <div>Funcao</div>
                        <div>Qtd</div>
                        <div>Horas</div>
                        <div>Custo/H</div>
                        <div>Total</div>
                      </div>
                      <div className="grid grid-cols-5 gap-2">
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Funcao" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pedreiro">Pedreiro</SelectItem>
                            <SelectItem value="servente">Servente</SelectItem>
                            <SelectItem value="carpinteiro">Carpinteiro</SelectItem>
                            <SelectItem value="armador">Armador</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input type="number" placeholder="0" />
                        <Input type="number" placeholder="0" />
                        <Input type="number" placeholder="0,00" />
                        <Input disabled placeholder="R$ 0,00" />
                      </div>
                    </div>

                    {/* Equipamentos */}
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium flex items-center gap-2">
                          <Wrench className="h-4 w-4 text-orange-600" />
                          Equipamentos
                        </h4>
                        <Button variant="outline" size="sm">
                          <Plus className="h-4 w-4 mr-1" />
                          Adicionar
                        </Button>
                      </div>
                      <div className="grid grid-cols-5 gap-2 text-sm font-medium text-muted-foreground mb-2">
                        <div>Equipamento</div>
                        <div>Qtd</div>
                        <div>Horas</div>
                        <div>Custo/H</div>
                        <div>Total</div>
                      </div>
                      <div className="grid grid-cols-5 gap-2">
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Equipamento" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bomba">Bomba de Concreto</SelectItem>
                            <SelectItem value="vibrador">Vibrador</SelectItem>
                            <SelectItem value="betoneira">Betoneira</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input type="number" placeholder="0" />
                        <Input type="number" placeholder="0" />
                        <Input type="number" placeholder="0,00" />
                        <Input disabled placeholder="R$ 0,00" />
                      </div>
                    </div>

                    {/* Materiais */}
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium flex items-center gap-2">
                          <Package className="h-4 w-4 text-green-600" />
                          Materiais
                        </h4>
                        <Button variant="outline" size="sm">
                          <Plus className="h-4 w-4 mr-1" />
                          Adicionar
                        </Button>
                      </div>
                      <div className="grid grid-cols-5 gap-2 text-sm font-medium text-muted-foreground mb-2">
                        <div>Material</div>
                        <div>Qtd</div>
                        <div>Un</div>
                        <div>Custo Un</div>
                        <div>Total</div>
                      </div>
                      <div className="grid grid-cols-5 gap-2">
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Material" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="concreto">Concreto FCK 30</SelectItem>
                            <SelectItem value="aco">Aco CA-50</SelectItem>
                            <SelectItem value="forma">Compensado</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input type="number" placeholder="0" />
                        <Input disabled value="M3" />
                        <Input type="number" placeholder="0,00" />
                        <Input disabled placeholder="R$ 0,00" />
                      </div>
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
          <div className="grid grid-cols-5 gap-4 mb-6">
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Apropriacoes Hoje</p>
                    <p className="text-2xl font-bold">{resumoApropriacao.totalDia}</p>
                  </div>
                  <FileText className="h-8 w-8 text-amber-600" />
                </div>
                <div className="flex gap-2 mt-2 text-xs">
                  <span className="text-green-600">{resumoApropriacao.aprovados} aprovados</span>
                  <span className="text-muted-foreground">|</span>
                  <span className="text-amber-600">{resumoApropriacao.pendentes} pendente</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Custo Apropriado</p>
                    <p className="text-2xl font-bold">R$ 90,5K</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-blue-600" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">Total do dia</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Custo Orcado</p>
                    <p className="text-2xl font-bold">R$ 97,5K</p>
                  </div>
                  <Target className="h-8 w-8 text-purple-600" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">Meta do dia</p>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-green-50">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Economia</p>
                    <p className="text-2xl font-bold text-green-600">R$ 7,0K</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-xs text-green-600 mt-2">7.2% abaixo do orcado</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Produtividade</p>
                    <p className="text-2xl font-bold">108%</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-emerald-600" />
                </div>
                <p className="text-xs text-green-600 mt-2">Acima da meta</p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="flex items-center justify-between mb-4">
              <TabsList>
                <TabsTrigger value="diario">Diario</TabsTrigger>
                <TabsTrigger value="servico">Por Servico</TabsTrigger>
                <TabsTrigger value="recurso">Por Recurso</TabsTrigger>
                <TabsTrigger value="pendentes">Pendentes</TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-2">
                <Select value={filtroStatus} onValueChange={setFiltroStatus}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="pendente">Pendentes</SelectItem>
                    <SelectItem value="aprovado">Aprovados</SelectItem>
                  </SelectContent>
                </Select>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <TabsContent value="diario" className="mt-0">
              <div className="flex gap-6">
                {/* Lista de Apropriacoes */}
                <Card className="flex-1">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">
                      Apropriacoes - {format(dataSelecionada, "dd/MM/yyyy", { locale: ptBR })}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="grid grid-cols-8 gap-2 px-4 py-2 bg-muted/50 border-b text-xs font-medium text-muted-foreground">
                      <div className="col-span-2">Servico</div>
                      <div>EAP</div>
                      <div className="text-right">Qtd Prev</div>
                      <div className="text-right">Qtd Real</div>
                      <div className="text-right">Custo</div>
                      <div className="text-right">Desvio</div>
                      <div className="text-center">Status</div>
                    </div>
                    <ScrollArea className="h-[400px]">
                      {apropriacoes.map((item) => (
                        <div
                          key={item.id}
                          className={`grid grid-cols-8 gap-2 px-4 py-3 border-b hover:bg-muted/50 cursor-pointer transition-colors ${
                            selectedApropriacao?.id === item.id ? "bg-amber-50 border-l-4 border-l-amber-500" : ""
                          }`}
                          onClick={() => setSelectedApropriacao(item)}
                        >
                          <div className="col-span-2 font-medium text-sm truncate">{item.servico}</div>
                          <div className="text-sm text-muted-foreground">{item.eap}</div>
                          <div className="text-sm text-right">{item.qtdPrevista}</div>
                          <div className="text-sm text-right">{item.qtdApropriada}</div>
                          <div className="text-sm text-right font-medium">{formatCurrency(item.custoTotal)}</div>
                          <div
                            className={`text-sm text-right font-medium ${item.desvio < 0 ? "text-green-600" : "text-red-600"}`}
                          >
                            {item.desvio > 0 ? "+" : ""}
                            {item.desvio.toFixed(1)}%
                          </div>
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
                              {item.status === "aprovado" ? "Aprovado" : "Pendente"}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </ScrollArea>
                  </CardContent>
                </Card>

                {/* Painel de Detalhes */}
                {selectedApropriacao && (
                  <Card className="w-[450px]">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">Detalhes da Apropriacao</CardTitle>
                        <Badge
                          variant={selectedApropriacao.status === "aprovado" ? "default" : "secondary"}
                          className={selectedApropriacao.status === "aprovado" ? "bg-green-600" : "bg-amber-500"}
                        >
                          {selectedApropriacao.status === "aprovado" ? "Aprovado" : "Pendente"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Servico</p>
                        <p className="font-medium">{selectedApropriacao.servico}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">EAP</p>
                          <p>{selectedApropriacao.eap}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">PBS</p>
                          <p>{selectedApropriacao.pbs}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Qtd Prev</p>
                          <p className="font-medium">{selectedApropriacao.qtdPrevista}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Qtd Real</p>
                          <p className="font-medium">{selectedApropriacao.qtdApropriada}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Unidade</p>
                          <p>{selectedApropriacao.unidade}</p>
                        </div>
                      </div>

                      {/* Mao de Obra */}
                      <div className="border-t pt-4">
                        <h4 className="font-medium flex items-center gap-2 mb-2">
                          <Users className="h-4 w-4 text-blue-600" />
                          Mao de Obra
                        </h4>
                        <div className="space-y-1">
                          {selectedApropriacao.recursos.maoDeObra.map((item, idx) => (
                            <div key={idx} className="flex justify-between text-sm">
                              <span>
                                {item.nome} ({item.qtd}x {item.horasTrab}h)
                              </span>
                              <span className="font-medium">{formatCurrency(item.custoTotal)}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Equipamentos */}
                      <div className="border-t pt-4">
                        <h4 className="font-medium flex items-center gap-2 mb-2">
                          <Wrench className="h-4 w-4 text-orange-600" />
                          Equipamentos
                        </h4>
                        <div className="space-y-1">
                          {selectedApropriacao.recursos.equipamentos.map((item, idx) => (
                            <div key={idx} className="flex justify-between text-sm">
                              <span>
                                {item.nome} ({item.qtd}x {item.horasUso}h)
                              </span>
                              <span className="font-medium">{formatCurrency(item.custoTotal)}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Materiais */}
                      <div className="border-t pt-4">
                        <h4 className="font-medium flex items-center gap-2 mb-2">
                          <Package className="h-4 w-4 text-green-600" />
                          Materiais
                        </h4>
                        <div className="space-y-1">
                          {selectedApropriacao.recursos.materiais.map((item, idx) => (
                            <div key={idx} className="flex justify-between text-sm">
                              <span>
                                {item.nome} ({item.qtd} {item.unidade})
                              </span>
                              <span className="font-medium">{formatCurrency(item.custoTotal)}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Totais */}
                      <div className="border-t pt-4 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Custo Apropriado</span>
                          <span className="font-bold">{formatCurrency(selectedApropriacao.custoTotal)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Custo Orcado</span>
                          <span>{formatCurrency(selectedApropriacao.custoOrcado)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Desvio</span>
                          <span
                            className={`font-bold ${selectedApropriacao.desvio < 0 ? "text-green-600" : "text-red-600"}`}
                          >
                            {selectedApropriacao.desvio > 0 ? "+" : ""}
                            {selectedApropriacao.desvio.toFixed(2)}%
                          </span>
                        </div>
                      </div>

                      {selectedApropriacao.status === "pendente" && (
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

            <TabsContent value="servico">
              <Card>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground text-center py-8">Visao por servico em desenvolvimento</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recurso">
              <Card>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground text-center py-8">Visao por recurso em desenvolvimento</p>
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
          </Tabs>
        </div>
      </div>
    </TooltipProvider>
  )
}
