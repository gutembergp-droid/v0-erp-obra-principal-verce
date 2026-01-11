"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Download,
  FileText,
  Clock,
  Calendar,
  BarChart3,
  PieChart,
  TrendingUp,
  Building2,
  DollarSign,
  Eye,
  Send,
  Star,
  Plus,
  Search,
  Filter,
  RefreshCw,
  Settings,
} from "lucide-react"
import { FinanceiroNavbar } from "../_components/financeiro-navbar"

// Dados mockados
const relatoriosPredefinidos = [
  {
    id: "1",
    nome: "DRE Consolidado",
    descricao: "Demonstrativo de resultado por periodo",
    categoria: "contabil",
    icon: BarChart3,
    favorito: true,
    ultimaGeracao: "2025-01-08",
  },
  {
    id: "2",
    nome: "Fluxo de Caixa Projetado",
    descricao: "Projecao de entradas e saidas por obra",
    categoria: "financeiro",
    icon: TrendingUp,
    favorito: true,
    ultimaGeracao: "2025-01-07",
  },
  {
    id: "3",
    nome: "Posicao Financeira por Obra",
    descricao: "Saldos, CAP e CAR por centro de custo",
    categoria: "financeiro",
    icon: Building2,
    favorito: false,
    ultimaGeracao: "2025-01-05",
  },
  {
    id: "4",
    nome: "Analise de Inadimplencia",
    descricao: "Aging de recebiveis vencidos",
    categoria: "cobranca",
    icon: Clock,
    favorito: false,
    ultimaGeracao: "2025-01-06",
  },
  {
    id: "5",
    nome: "Orcamento x Realizado",
    descricao: "Comparativo orcamentario consolidado",
    categoria: "orcamento",
    icon: PieChart,
    favorito: true,
    ultimaGeracao: "2025-01-08",
  },
  {
    id: "6",
    nome: "Movimentacao Bancaria",
    descricao: "Extrato de todas as contas",
    categoria: "bancario",
    icon: DollarSign,
    favorito: false,
    ultimaGeracao: "2025-01-03",
  },
]

const relatoriosAgendados = [
  {
    id: "1",
    nome: "DRE Mensal",
    frequencia: "Mensal",
    proximaExecucao: "2025-02-01",
    destinatarios: ["diretoria@empresa.com", "financeiro@empresa.com"],
    ativo: true,
  },
  {
    id: "2",
    nome: "Fluxo de Caixa Semanal",
    frequencia: "Semanal",
    proximaExecucao: "2025-01-13",
    destinatarios: ["tesouraria@empresa.com"],
    ativo: true,
  },
  {
    id: "3",
    nome: "Posicao Diaria",
    frequencia: "Diario",
    proximaExecucao: "2025-01-10",
    destinatarios: ["cfo@empresa.com"],
    ativo: false,
  },
]

const historicoRelatorios = [
  {
    id: "1",
    nome: "DRE Consolidado - Dezembro/2024",
    data: "2025-01-08 09:15",
    usuario: "Maria Silva",
    formato: "PDF",
  },
  {
    id: "2",
    nome: "Fluxo de Caixa - Semana 01/2025",
    data: "2025-01-07 14:30",
    usuario: "Joao Santos",
    formato: "Excel",
  },
  { id: "3", nome: "Orcamento x Realizado - 2024", data: "2025-01-06 11:00", usuario: "Maria Silva", formato: "PDF" },
  {
    id: "4",
    nome: "Aging Recebiveis - Janeiro/2025",
    data: "2025-01-06 08:45",
    usuario: "Ana Costa",
    formato: "Excel",
  },
  {
    id: "5",
    nome: "Posicao Financeira - Obra Central",
    data: "2025-01-05 16:20",
    usuario: "Joao Santos",
    formato: "PDF",
  },
]

export default function RelatoriosPage() {
  const [busca, setBusca] = useState("")
  const [categoriaFiltro, setCategoriaFiltro] = useState("todos")
  const [tabAtiva, setTabAtiva] = useState("predefinidos")

  const getCategoriaColor = (categoria: string) => {
    switch (categoria) {
      case "contabil":
        return "bg-blue-100 text-blue-700"
      case "financeiro":
        return "bg-emerald-100 text-emerald-700"
      case "cobranca":
        return "bg-amber-100 text-amber-700"
      case "orcamento":
        return "bg-purple-100 text-purple-700"
      case "bancario":
        return "bg-slate-100 text-slate-700"
      default:
        return "bg-slate-100 text-slate-700"
    }
  }

  const relatoriosFiltrados = relatoriosPredefinidos.filter((r) => {
    const matchBusca = r.nome.toLowerCase().includes(busca.toLowerCase())
    const matchCategoria = categoriaFiltro === "todos" || r.categoria === categoriaFiltro
    return matchBusca && matchCategoria
  })

  return (
    <div className="flex flex-col h-screen bg-muted/30 overflow-hidden">
      <div className="flex-shrink-0 z-40 mt-0">
        <FinanceiroNavbar />
      </div>
      <main className="flex-1 bg-background overflow-hidden p-6">
        <div 
          className="h-full border-0 bg-background overflow-y-auto overflow-x-hidden scrollbar-hide p-6 space-y-6" 
          style={{ 
            borderRadius: '25px', 
            boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.13), 0 2px 8px rgba(0, 0, 0, 0.05)',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Relatorios Gerenciais</h1>
          <p className="text-slate-500">Gere e agende relatorios financeiros</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Configurar
          </Button>
          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
            <Plus className="h-4 w-4 mr-2" />
            Novo Relatorio
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={tabAtiva} onValueChange={setTabAtiva}>
        <TabsList>
          <TabsTrigger value="predefinidos">Predefinidos</TabsTrigger>
          <TabsTrigger value="agendados">Agendados</TabsTrigger>
          <TabsTrigger value="historico">Historico</TabsTrigger>
        </TabsList>

        {/* Relatorios Predefinidos */}
        <TabsContent value="predefinidos" className="space-y-4">
          {/* Filtros */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Buscar relatorio..."
                className="pl-9"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
            </div>
            <Select value={categoriaFiltro} onValueChange={setCategoriaFiltro}>
              <SelectTrigger className="w-40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todas</SelectItem>
                <SelectItem value="contabil">Contabil</SelectItem>
                <SelectItem value="financeiro">Financeiro</SelectItem>
                <SelectItem value="cobranca">Cobranca</SelectItem>
                <SelectItem value="orcamento">Orcamento</SelectItem>
                <SelectItem value="bancario">Bancario</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Favoritos */}
          <div>
            <h3 className="text-sm font-medium text-slate-700 mb-3 flex items-center gap-2">
              <Star className="h-4 w-4 text-amber-500" />
              Favoritos
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {relatoriosFiltrados
                .filter((r) => r.favorito)
                .map((relatorio) => {
                  const Icon = relatorio.icon
                  return (
                    <Card
                      key={relatorio.id}
                      className="hover:border-emerald-300 hover:shadow-sm transition-all cursor-pointer"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                              <Icon className="h-5 w-5 text-emerald-600" />
                            </div>
                            <div>
                              <p className="font-medium text-slate-900">{relatorio.nome}</p>
                              <p className="text-xs text-slate-500">{relatorio.descricao}</p>
                            </div>
                          </div>
                          <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <Badge className={getCategoriaColor(relatorio.categoria)}>{relatorio.categoria}</Badge>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
            </div>
          </div>

          {/* Todos os Relatorios */}
          <div>
            <h3 className="text-sm font-medium text-slate-700 mb-3">Todos os Relatorios</h3>
            <div className="grid grid-cols-3 gap-4">
              {relatoriosFiltrados
                .filter((r) => !r.favorito)
                .map((relatorio) => {
                  const Icon = relatorio.icon
                  return (
                    <Card
                      key={relatorio.id}
                      className="hover:border-slate-300 hover:shadow-sm transition-all cursor-pointer"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center">
                            <Icon className="h-5 w-5 text-slate-600" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-slate-900">{relatorio.nome}</p>
                            <p className="text-xs text-slate-500">{relatorio.descricao}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <Badge className={getCategoriaColor(relatorio.categoria)}>{relatorio.categoria}</Badge>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
            </div>
          </div>
        </TabsContent>

        {/* Relatorios Agendados */}
        <TabsContent value="agendados" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">Relatorios Agendados</CardTitle>
                  <CardDescription>Configuracoes de envio automatico</CardDescription>
                </div>
                <Button size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Agendar Novo
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {relatoriosAgendados.map((agendado) => (
                  <div key={agendado.id} className="p-4 flex items-center justify-between hover:bg-slate-50">
                    <div className="flex items-center gap-4">
                      <div
                        className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                          agendado.ativo ? "bg-emerald-100" : "bg-slate-100"
                        }`}
                      >
                        <RefreshCw className={`h-5 w-5 ${agendado.ativo ? "text-emerald-600" : "text-slate-400"}`} />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{agendado.nome}</p>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <Badge variant="outline" className="text-[10px]">
                            {agendado.frequencia}
                          </Badge>
                          <span>Proxima: {new Date(agendado.proximaExecucao).toLocaleDateString("pt-BR")}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-xs text-slate-500">Destinatarios</p>
                        <p className="text-xs text-slate-700">{agendado.destinatarios.length} emails</p>
                      </div>
                      <Badge className={agendado.ativo ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}>
                        {agendado.ativo ? "Ativo" : "Pausado"}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Historico */}
        <TabsContent value="historico" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">Historico de Geracao</CardTitle>
                  <CardDescription>Relatorios gerados recentemente</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Select defaultValue="7">
                    <SelectTrigger className="w-40">
                      <Calendar className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">Ultimos 7 dias</SelectItem>
                      <SelectItem value="30">Ultimos 30 dias</SelectItem>
                      <SelectItem value="90">Ultimos 90 dias</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {historicoRelatorios.map((hist) => (
                  <div key={hist.id} className="p-4 flex items-center justify-between hover:bg-slate-50">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-slate-600" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{hist.nome}</p>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <Clock className="h-3 w-3" />
                          <span>{hist.data}</span>
                          <span>por {hist.usuario}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline">{hist.formato}</Badge>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
        </div>
      </main>
    </div>
  )
}
