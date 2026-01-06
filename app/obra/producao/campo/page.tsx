"use client"

import { useState, Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import {
  HardHat,
  Search,
  Filter,
  Users,
  MapPin,
  Clock,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Activity,
  Calendar,
  ChevronRight,
  Truck,
  Wrench,
  Target,
  Play,
  Pause,
} from "lucide-react"

// Dados mockados
const kpis = {
  frentesAtivas: 8,
  equipesAlocadas: 12,
  efetivoDia: 156,
  avancoHoje: 2.3,
  metaDia: 2.8,
  produtividade: 82,
}

const frentes = [
  {
    id: "FRT-001",
    nome: "Terraplanagem - Area Norte",
    servico: "Terraplanagem",
    pacote: "PKT-001",
    status: "Em Execucao",
    avanco: 68,
    metaDia: 2.5,
    realizadoDia: 2.8,
    efetivo: 24,
    equipamentos: 6,
    encarregado: "Jose Silva",
    inicio: "15/10/2025",
    previsaoTermino: "28/02/2026",
    observacao: "Produtividade acima da meta",
  },
  {
    id: "FRT-002",
    nome: "Fundacoes - Bloco A",
    servico: "Fundacao",
    pacote: "PKT-003",
    status: "Em Execucao",
    avanco: 45,
    metaDia: 1.2,
    realizadoDia: 0.9,
    efetivo: 18,
    equipamentos: 3,
    encarregado: "Carlos Santos",
    inicio: "01/11/2025",
    previsaoTermino: "15/03/2026",
    observacao: "Atraso por chuva ontem",
  },
  {
    id: "FRT-003",
    nome: "Estrutura - Bloco B",
    servico: "Estrutura",
    pacote: "PKT-005",
    status: "Paralisada",
    avanco: 32,
    metaDia: 0,
    realizadoDia: 0,
    efetivo: 0,
    equipamentos: 0,
    encarregado: "Roberto Lima",
    inicio: "20/11/2025",
    previsaoTermino: "30/04/2026",
    observacao: "Aguardando liberacao de projeto revisado",
  },
  {
    id: "FRT-004",
    nome: "Drenagem - Trecho 1",
    servico: "Drenagem",
    pacote: "PKT-002",
    status: "Em Execucao",
    avanco: 89,
    metaDia: 1.0,
    realizadoDia: 1.1,
    efetivo: 12,
    equipamentos: 2,
    encarregado: "Maria Costa",
    inicio: "01/10/2025",
    previsaoTermino: "15/01/2026",
    observacao: "Finalizacao proxima",
  },
  {
    id: "FRT-005",
    nome: "Pavimentacao - Via Principal",
    servico: "Pavimentacao",
    pacote: "PKT-004",
    status: "Aguardando",
    avanco: 0,
    metaDia: 0,
    realizadoDia: 0,
    efetivo: 0,
    equipamentos: 0,
    encarregado: "Paulo Mendes",
    inicio: null,
    previsaoTermino: null,
    observacao: "Aguardando conclusao da drenagem",
  },
]

const equipesFrente = [
  { nome: "Equipe A - Escavacao", efetivo: 8, funcao: "Operadores de maquinas" },
  { nome: "Equipe B - Compactacao", efetivo: 6, funcao: "Operadores e auxiliares" },
  { nome: "Equipe C - Topografia", efetivo: 4, funcao: "Topografos" },
  { nome: "Equipe D - Apoio", efetivo: 6, funcao: "Serventes" },
]

const equipamentosFrente = [
  { nome: "Escavadeira CAT 320", status: "Operando", horas: "8.5h" },
  { nome: "Motoniveladora 140K", status: "Operando", horas: "7.2h" },
  { nome: "Rolo Compactador", status: "Manutencao", horas: "0h" },
  { nome: "Caminhao Basculante 01", status: "Operando", horas: "8.0h" },
  { nome: "Caminhao Basculante 02", status: "Operando", horas: "7.8h" },
  { nome: "Retroescavadeira", status: "Parado", horas: "2.5h" },
]

function CampoContent() {
  const [filtroStatus, setFiltroStatus] = useState("todos")
  const [filtroServico, setFiltroServico] = useState("todos")
  const [busca, setBusca] = useState("")
  const [frenteSelecionada, setFrenteSelecionada] = useState<(typeof frentes)[0] | null>(null)
  const [painelAberto, setPainelAberto] = useState(false)

  const frentesFiltradas = frentes.filter((frente) => {
    const matchStatus = filtroStatus === "todos" || frente.status === filtroStatus
    const matchServico = filtroServico === "todos" || frente.servico === filtroServico
    const matchBusca =
      busca === "" ||
      frente.nome.toLowerCase().includes(busca.toLowerCase()) ||
      frente.encarregado.toLowerCase().includes(busca.toLowerCase())
    return matchStatus && matchServico && matchBusca
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Em Execucao":
        return "bg-primary/10 text-primary"
      case "Paralisada":
        return "bg-destructive/10 text-destructive"
      case "Aguardando":
        return "bg-muted text-muted-foreground"
      case "Concluida":
        return "bg-primary/10 text-primary"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Em Execucao":
        return <Play className="w-4 h-4" />
      case "Paralisada":
        return <Pause className="w-4 h-4" />
      case "Aguardando":
        return <Clock className="w-4 h-4" />
      case "Concluida":
        return <CheckCircle className="w-4 h-4" />
      default:
        return <Activity className="w-4 h-4" />
    }
  }

  const getProdutividadeIcon = (realizado: number, meta: number) => {
    if (meta === 0) return null
    const percentual = (realizado / meta) * 100
    if (percentual >= 100) return <TrendingUp className="w-4 h-4 text-primary" />
    if (percentual >= 80) return <Activity className="w-4 h-4 text-accent-foreground" />
    return <TrendingDown className="w-4 h-4 text-destructive" />
  }

  const abrirDetalhe = (frente: (typeof frentes)[0]) => {
    setFrenteSelecionada(frente)
    setPainelAberto(true)
  }

  return (
    <div className="overflow-auto h-full">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-foreground">Campo / Execucao</h1>
              <Badge variant="outline" className="text-xs">
                PR-01
              </Badge>
            </div>
            <p className="text-muted-foreground text-sm mt-1">Frentes de servico e acompanhamento diario</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              Historico
            </Button>
            <Button size="sm" className="bg-primary text-primary-foreground">
              <HardHat className="w-4 h-4 mr-2" />
              Nova Frente
            </Button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-6 gap-4">
          <Card className="bg-card border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Frentes Ativas</p>
                  <p className="text-2xl font-bold text-foreground">{kpis.frentesAtivas}</p>
                </div>
                <div className="p-2 rounded-lg bg-primary/10">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Equipes</p>
                  <p className="text-2xl font-bold text-foreground">{kpis.equipesAlocadas}</p>
                </div>
                <div className="p-2 rounded-lg bg-primary/10">
                  <Users className="w-5 h-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Efetivo Dia</p>
                  <p className="text-2xl font-bold text-foreground">{kpis.efetivoDia}</p>
                </div>
                <div className="p-2 rounded-lg bg-primary/10">
                  <HardHat className="w-5 h-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Avanco Hoje</p>
                  <p className="text-2xl font-bold text-foreground">{kpis.avancoHoje}%</p>
                  <p className="text-xs text-muted-foreground">Meta: {kpis.metaDia}%</p>
                </div>
                <div className="p-2 rounded-lg bg-accent/20">
                  <TrendingUp className="w-5 h-5 text-accent-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Produtividade</p>
                  <p className="text-2xl font-bold text-foreground">{kpis.produtividade}%</p>
                </div>
                <div className="p-2 rounded-lg bg-primary/10">
                  <Target className="w-5 h-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Desvio</p>
                  <p className="text-2xl font-bold text-destructive">-0.5%</p>
                </div>
                <div className="p-2 rounded-lg bg-destructive/10">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alerta de Governanca */}
        {frentes.some((f) => f.status === "Paralisada") && (
          <Card className="border-l-4 border-l-destructive bg-destructive/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-destructive" />
                <div>
                  <p className="font-medium text-foreground">Frente paralisada identificada</p>
                  <p className="text-sm text-muted-foreground">
                    {frentes.filter((f) => f.status === "Paralisada").length} frente(s) paralisada(s). Verificar causa e
                    impacto no cronograma.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Filtros */}
        <Card className="bg-card border">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Filter className="w-4 h-4" />
                <span className="text-sm font-medium">Filtros:</span>
              </div>

              <Select value={filtroStatus} onValueChange={setFiltroStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="Em Execucao">Em Execucao</SelectItem>
                  <SelectItem value="Paralisada">Paralisada</SelectItem>
                  <SelectItem value="Aguardando">Aguardando</SelectItem>
                  <SelectItem value="Concluida">Concluida</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filtroServico} onValueChange={setFiltroServico}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Servico" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="Terraplanagem">Terraplanagem</SelectItem>
                  <SelectItem value="Fundacao">Fundacao</SelectItem>
                  <SelectItem value="Estrutura">Estrutura</SelectItem>
                  <SelectItem value="Drenagem">Drenagem</SelectItem>
                  <SelectItem value="Pavimentacao">Pavimentacao</SelectItem>
                </SelectContent>
              </Select>

              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por frente ou encarregado..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabela de Frentes */}
        <Card className="bg-card border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              Frentes de Servico
              <Badge variant="secondary" className="ml-2">
                {frentesFiltradas.length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr className="text-left text-xs text-muted-foreground">
                    <th className="p-3 font-medium">Frente</th>
                    <th className="p-3 font-medium">Servico</th>
                    <th className="p-3 font-medium">Status</th>
                    <th className="p-3 font-medium">Avanco</th>
                    <th className="p-3 font-medium">Produtividade Dia</th>
                    <th className="p-3 font-medium">Efetivo</th>
                    <th className="p-3 font-medium">Encarregado</th>
                    <th className="p-3 font-medium">Acoes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {frentesFiltradas.map((frente) => (
                    <tr
                      key={frente.id}
                      className="hover:bg-muted/30 cursor-pointer transition-colors"
                      onClick={() => abrirDetalhe(frente)}
                    >
                      <td className="p-3">
                        <div>
                          <span className="text-sm font-medium text-foreground">{frente.nome}</span>
                          <p className="text-xs text-muted-foreground">{frente.pacote}</p>
                        </div>
                      </td>
                      <td className="p-3">
                        <Badge variant="outline" className="text-xs">
                          {frente.servico}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <Badge className={`text-xs ${getStatusColor(frente.status)}`}>
                          <span className="flex items-center gap-1">
                            {getStatusIcon(frente.status)}
                            {frente.status}
                          </span>
                        </Badge>
                      </td>
                      <td className="p-3">
                        <div className="w-24">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-foreground">{frente.avanco}%</span>
                          </div>
                          <Progress value={frente.avanco} className="h-2" />
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-foreground">{frente.realizadoDia}%</span>
                          <span className="text-xs text-muted-foreground">/ {frente.metaDia}%</span>
                          {getProdutividadeIcon(frente.realizadoDia, frente.metaDia)}
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-foreground">{frente.efetivo}</span>
                          <Truck className="w-4 h-4 text-muted-foreground ml-2" />
                          <span className="text-sm text-foreground">{frente.equipamentos}</span>
                        </div>
                      </td>
                      <td className="p-3">
                        <span className="text-sm text-muted-foreground">{frente.encarregado}</span>
                      </td>
                      <td className="p-3">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Painel Lateral */}
        <Sheet open={painelAberto} onOpenChange={setPainelAberto}>
          <SheetContent className="w-[500px] sm:max-w-[500px] overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Detalhe da Frente
              </SheetTitle>
            </SheetHeader>

            {frenteSelecionada && (
              <div className="mt-6 space-y-6">
                {/* Info Principal */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="font-mono">
                      {frenteSelecionada.id}
                    </Badge>
                    <Badge className={getStatusColor(frenteSelecionada.status)}>
                      {getStatusIcon(frenteSelecionada.status)}
                      <span className="ml-1">{frenteSelecionada.status}</span>
                    </Badge>
                  </div>

                  <h3 className="text-lg font-semibold text-foreground">{frenteSelecionada.nome}</h3>

                  <Card className="bg-muted/30">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Avanco Geral</span>
                        <span className="text-sm font-medium text-foreground">{frenteSelecionada.avanco}%</span>
                      </div>
                      <Progress value={frenteSelecionada.avanco} className="h-3" />
                    </CardContent>
                  </Card>
                </div>

                <Separator />

                {/* Equipes */}
                <div className="space-y-3">
                  <h4 className="font-medium text-foreground flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    Equipes Alocadas
                  </h4>
                  <div className="space-y-2">
                    {equipesFrente.map((equipe, index) => (
                      <Card key={index} className="bg-muted/30">
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-foreground">{equipe.nome}</p>
                              <p className="text-xs text-muted-foreground">{equipe.funcao}</p>
                            </div>
                            <Badge variant="secondary">{equipe.efetivo} pessoas</Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Equipamentos */}
                <div className="space-y-3">
                  <h4 className="font-medium text-foreground flex items-center gap-2">
                    <Truck className="w-4 h-4 text-primary" />
                    Equipamentos
                  </h4>
                  <div className="space-y-2">
                    {equipamentosFrente.map((equip, index) => (
                      <Card key={index} className="bg-muted/30">
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Wrench className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm text-foreground">{equip.nome}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge
                                className={
                                  equip.status === "Operando"
                                    ? "bg-primary/10 text-primary"
                                    : equip.status === "Manutencao"
                                      ? "bg-destructive/10 text-destructive"
                                      : "bg-muted text-muted-foreground"
                                }
                              >
                                {equip.status}
                              </Badge>
                              <span className="text-xs text-muted-foreground">{equip.horas}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Observacao */}
                <div className="space-y-3">
                  <h4 className="font-medium text-foreground">Observacao</h4>
                  <Card className="bg-muted/30">
                    <CardContent className="p-3">
                      <p className="text-sm text-foreground">{frenteSelecionada.observacao}</p>
                    </CardContent>
                  </Card>
                </div>

                <Separator />

                {/* Acoes */}
                <div className="flex gap-2">
                  <Button className="flex-1 bg-primary text-primary-foreground">
                    <Activity className="w-4 h-4 mr-2" />
                    Apontar
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <Calendar className="w-4 h-4 mr-2" />
                    Historico
                  </Button>
                </div>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

export default function CampoExecucaoPage() {
  return (
    <Suspense fallback={null}>
      <CampoContent />
    </Suspense>
  )
}
