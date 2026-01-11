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
import { ObraProducaoNavbar } from "../../_components/obra-producao-navbar"
import {
  TrendingUp,
  TrendingDown,
  Search,
  Filter,
  Target,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  Users,
  Calendar,
  ChevronRight,
  Award,
  Zap,
  ArrowUp,
  ArrowDown,
  Minus,
} from "lucide-react"

// Dados mockados
const kpis = {
  produtividadeGeral: 87,
  metaGeral: 100,
  servicosAcimaMeta: 4,
  servicosAbaixoMeta: 2,
  melhorServico: "Terraplanagem",
  piorServico: "Estrutura",
}

const servicos = [
  {
    id: "SRV-001",
    nome: "Terraplanagem",
    pacote: "PKT-001",
    unidade: "m³",
    metaDia: 850,
    realizadoDia: 920,
    produtividade: 108,
    tendencia: "alta",
    acumuladoPlanejado: 45000,
    acumuladoRealizado: 48500,
    desvio: 7.8,
    equipes: 3,
    efetivo: 24,
  },
  {
    id: "SRV-002",
    nome: "Drenagem",
    pacote: "PKT-002",
    unidade: "m",
    metaDia: 120,
    realizadoDia: 115,
    produtividade: 96,
    tendencia: "estavel",
    acumuladoPlanejado: 2800,
    acumuladoRealizado: 2650,
    desvio: -5.4,
    equipes: 2,
    efetivo: 12,
  },
  {
    id: "SRV-003",
    nome: "Fundacao",
    pacote: "PKT-003",
    unidade: "m³",
    metaDia: 45,
    realizadoDia: 38,
    produtividade: 84,
    tendencia: "baixa",
    acumuladoPlanejado: 1200,
    acumuladoRealizado: 980,
    desvio: -18.3,
    equipes: 2,
    efetivo: 18,
  },
  {
    id: "SRV-004",
    nome: "Estrutura",
    pacote: "PKT-005",
    unidade: "m³",
    metaDia: 25,
    realizadoDia: 18,
    produtividade: 72,
    tendencia: "baixa",
    acumuladoPlanejado: 650,
    acumuladoRealizado: 420,
    desvio: -35.4,
    equipes: 2,
    efetivo: 20,
  },
  {
    id: "SRV-005",
    nome: "Pavimentacao",
    pacote: "PKT-004",
    unidade: "m²",
    metaDia: 0,
    realizadoDia: 0,
    produtividade: 0,
    tendencia: "aguardando",
    acumuladoPlanejado: 0,
    acumuladoRealizado: 0,
    desvio: 0,
    equipes: 0,
    efetivo: 0,
  },
]

const rankingEquipes = [
  { posicao: 1, nome: "Equipe Terra A", servico: "Terraplanagem", produtividade: 112, variacao: "+5%" },
  { posicao: 2, nome: "Equipe Drenagem B", servico: "Drenagem", produtividade: 98, variacao: "+2%" },
  { posicao: 3, nome: "Equipe Terra B", servico: "Terraplanagem", produtividade: 96, variacao: "0%" },
  { posicao: 4, nome: "Equipe Fundacao A", servico: "Fundacao", produtividade: 88, variacao: "-3%" },
  { posicao: 5, nome: "Equipe Estrutura A", servico: "Estrutura", produtividade: 72, variacao: "-8%" },
]

const historicoDiario = [
  { data: "06/01", planejado: 2.8, realizado: 2.5 },
  { data: "05/01", planejado: 2.8, realizado: 2.9 },
  { data: "04/01", planejado: 2.8, realizado: 2.7 },
  { data: "03/01", planejado: 2.8, realizado: 2.4 },
  { data: "02/01", planejado: 2.8, realizado: 2.6 },
]

function ProdutividadeContent() {
  const [filtroTendencia, setFiltroTendencia] = useState("todos")
  const [busca, setBusca] = useState("")
  const [servicoSelecionado, setServicoSelecionado] = useState<(typeof servicos)[0] | null>(null)
  const [painelAberto, setPainelAberto] = useState(false)

  const servicosFiltrados = servicos.filter((srv) => {
    const matchTendencia = filtroTendencia === "todos" || srv.tendencia === filtroTendencia
    const matchBusca = busca === "" || srv.nome.toLowerCase().includes(busca.toLowerCase())
    return matchTendencia && matchBusca
  })

  const getTendenciaIcon = (tendencia: string) => {
    switch (tendencia) {
      case "alta":
        return <ArrowUp className="w-4 h-4 text-primary" />
      case "baixa":
        return <ArrowDown className="w-4 h-4 text-destructive" />
      case "estavel":
        return <Minus className="w-4 h-4 text-muted-foreground" />
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />
    }
  }

  const getTendenciaColor = (tendencia: string) => {
    switch (tendencia) {
      case "alta":
        return "bg-primary/10 text-primary"
      case "baixa":
        return "bg-destructive/10 text-destructive"
      case "estavel":
        return "bg-muted text-muted-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getProdutividadeColor = (prod: number) => {
    if (prod >= 100) return "text-primary"
    if (prod >= 80) return "text-accent-foreground"
    if (prod > 0) return "text-destructive"
    return "text-muted-foreground"
  }

  const abrirDetalhe = (srv: (typeof servicos)[0]) => {
    setServicoSelecionado(srv)
    setPainelAberto(true)
  }

  return (
    <div className="overflow-auto h-full">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-foreground">Produtividade</h1>
              <Badge variant="outline" className="text-xs">
                PR-02
              </Badge>
            </div>
            <p className="text-muted-foreground text-sm mt-1">Indices de produtividade por servico e equipe</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              Periodo
            </Button>
            <Button variant="outline" size="sm">
              <BarChart3 className="w-4 h-4 mr-2" />
              Relatorio
            </Button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-6 gap-4">
          <Card className="bg-card border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Produtividade Geral</p>
                  <p className="text-2xl font-bold text-foreground">{kpis.produtividadeGeral}%</p>
                  <p className="text-xs text-muted-foreground">Meta: {kpis.metaGeral}%</p>
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
                  <p className="text-xs text-muted-foreground">Acima da Meta</p>
                  <p className="text-2xl font-bold text-primary">{kpis.servicosAcimaMeta}</p>
                  <p className="text-xs text-muted-foreground">servicos</p>
                </div>
                <div className="p-2 rounded-lg bg-primary/10">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Abaixo da Meta</p>
                  <p className="text-2xl font-bold text-destructive">{kpis.servicosAbaixoMeta}</p>
                  <p className="text-xs text-muted-foreground">servicos</p>
                </div>
                <div className="p-2 rounded-lg bg-destructive/10">
                  <TrendingDown className="w-5 h-5 text-destructive" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border col-span-3">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-xs text-muted-foreground">Melhor Desempenho</p>
                    <p className="text-lg font-bold text-primary">{kpis.melhorServico}</p>
                  </div>
                  <Separator orientation="vertical" className="h-10" />
                  <div>
                    <p className="text-xs text-muted-foreground">Requer Atencao</p>
                    <p className="text-lg font-bold text-destructive">{kpis.piorServico}</p>
                  </div>
                </div>
                <div className="p-2 rounded-lg bg-accent/20">
                  <Award className="w-5 h-5 text-accent-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alerta de Governanca */}
        {kpis.servicosAbaixoMeta > 0 && (
          <Card className="border-l-4 border-l-destructive bg-destructive/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-destructive" />
                <div>
                  <p className="font-medium text-foreground">Servicos com produtividade critica</p>
                  <p className="text-sm text-muted-foreground">
                    {kpis.servicosAbaixoMeta} servico(s) abaixo de 80% da meta. Verificar causas e plano de acao.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-3 gap-6">
          {/* Tabela de Servicos */}
          <div className="col-span-2 space-y-4">
            {/* Filtros */}
            <Card className="bg-card border">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Filter className="w-4 h-4" />
                    <span className="text-sm font-medium">Filtros:</span>
                  </div>

                  <Select value={filtroTendencia} onValueChange={setFiltroTendencia}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Tendencia" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todas</SelectItem>
                      <SelectItem value="alta">Em Alta</SelectItem>
                      <SelectItem value="estavel">Estavel</SelectItem>
                      <SelectItem value="baixa">Em Baixa</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar servico..."
                      value={busca}
                      onChange={(e) => setBusca(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabela */}
            <Card className="bg-card border">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Activity className="w-4 h-4 text-primary" />
                  Produtividade por Servico
                  <Badge variant="secondary" className="ml-2">
                    {servicosFiltrados.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr className="text-left text-xs text-muted-foreground">
                        <th className="p-3 font-medium">Servico</th>
                        <th className="p-3 font-medium">Meta Dia</th>
                        <th className="p-3 font-medium">Realizado</th>
                        <th className="p-3 font-medium">Produtividade</th>
                        <th className="p-3 font-medium">Tendencia</th>
                        <th className="p-3 font-medium">Desvio Acum.</th>
                        <th className="p-3 font-medium">Acoes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {servicosFiltrados.map((srv) => (
                        <tr
                          key={srv.id}
                          className="hover:bg-muted/30 cursor-pointer transition-colors"
                          onClick={() => abrirDetalhe(srv)}
                        >
                          <td className="p-3">
                            <div>
                              <span className="text-sm font-medium text-foreground">{srv.nome}</span>
                              <p className="text-xs text-muted-foreground">{srv.pacote}</p>
                            </div>
                          </td>
                          <td className="p-3">
                            <span className="text-sm text-foreground">
                              {srv.metaDia > 0 ? `${srv.metaDia} ${srv.unidade}` : "-"}
                            </span>
                          </td>
                          <td className="p-3">
                            <span className="text-sm text-foreground">
                              {srv.realizadoDia > 0 ? `${srv.realizadoDia} ${srv.unidade}` : "-"}
                            </span>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <span className={`text-sm font-bold ${getProdutividadeColor(srv.produtividade)}`}>
                                {srv.produtividade > 0 ? `${srv.produtividade}%` : "-"}
                              </span>
                              {srv.produtividade >= 100 && <Zap className="w-4 h-4 text-primary" />}
                            </div>
                          </td>
                          <td className="p-3">
                            <Badge className={`text-xs ${getTendenciaColor(srv.tendencia)}`}>
                              <span className="flex items-center gap-1">
                                {getTendenciaIcon(srv.tendencia)}
                                {srv.tendencia === "aguardando"
                                  ? "Aguardando"
                                  : srv.tendencia === "alta"
                                    ? "Alta"
                                    : srv.tendencia === "baixa"
                                      ? "Baixa"
                                      : "Estavel"}
                              </span>
                            </Badge>
                          </td>
                          <td className="p-3">
                            <span className={`text-sm ${srv.desvio >= 0 ? "text-primary" : "text-destructive"}`}>
                              {srv.desvio !== 0 ? `${srv.desvio > 0 ? "+" : ""}${srv.desvio}%` : "-"}
                            </span>
                          </td>
                          <td className="p-3">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={(e) => e.stopPropagation()}
                            >
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
          </div>

          {/* Ranking de Equipes */}
          <div className="space-y-4">
            <Card className="bg-card border">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Award className="w-4 h-4 text-primary" />
                  Ranking de Equipes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {rankingEquipes.map((equipe) => (
                  <Card
                    key={equipe.posicao}
                    className={equipe.posicao <= 3 ? "bg-primary/5 border-primary/20" : "bg-muted/30"}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                            ${
                              equipe.posicao === 1
                                ? "bg-primary text-primary-foreground"
                                : equipe.posicao === 2
                                  ? "bg-primary/70 text-primary-foreground"
                                  : equipe.posicao === 3
                                    ? "bg-primary/50 text-primary-foreground"
                                    : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {equipe.posicao}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">{equipe.nome}</p>
                            <p className="text-xs text-muted-foreground">{equipe.servico}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`text-sm font-bold ${getProdutividadeColor(equipe.produtividade)}`}>
                            {equipe.produtividade}%
                          </p>
                          <p
                            className={`text-xs ${
                              equipe.variacao.startsWith("+")
                                ? "text-primary"
                                : equipe.variacao.startsWith("-")
                                  ? "text-destructive"
                                  : "text-muted-foreground"
                            }`}
                          >
                            {equipe.variacao}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Painel Lateral */}
        <Sheet open={painelAberto} onOpenChange={setPainelAberto}>
          <SheetContent className="w-[500px] sm:max-w-[500px] overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                Detalhe de Produtividade
              </SheetTitle>
            </SheetHeader>

            {servicoSelecionado && (
              <div className="mt-6 space-y-6">
                {/* Info Principal */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="font-mono">
                      {servicoSelecionado.pacote}
                    </Badge>
                    <Badge className={getTendenciaColor(servicoSelecionado.tendencia)}>
                      {getTendenciaIcon(servicoSelecionado.tendencia)}
                      <span className="ml-1">
                        {servicoSelecionado.tendencia === "alta"
                          ? "Em Alta"
                          : servicoSelecionado.tendencia === "baixa"
                            ? "Em Baixa"
                            : servicoSelecionado.tendencia === "estavel"
                              ? "Estavel"
                              : "Aguardando"}
                      </span>
                    </Badge>
                  </div>

                  <h3 className="text-lg font-semibold text-foreground">{servicoSelecionado.nome}</h3>

                  <Card className="bg-muted/30">
                    <CardContent className="p-4">
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground mb-1">Produtividade</p>
                        <p className={`text-4xl font-bold ${getProdutividadeColor(servicoSelecionado.produtividade)}`}>
                          {servicoSelecionado.produtividade > 0 ? `${servicoSelecionado.produtividade}%` : "-"}
                        </p>
                        <Progress value={Math.min(servicoSelecionado.produtividade, 100)} className="h-2 mt-3" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Separator />

                {/* Producao Diaria */}
                <div className="space-y-3">
                  <h4 className="font-medium text-foreground">Producao Diaria</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="bg-muted/30">
                      <CardContent className="p-3 text-center">
                        <p className="text-xs text-muted-foreground">Meta</p>
                        <p className="text-xl font-bold text-foreground">
                          {servicoSelecionado.metaDia} <span className="text-sm">{servicoSelecionado.unidade}</span>
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="bg-muted/30">
                      <CardContent className="p-3 text-center">
                        <p className="text-xs text-muted-foreground">Realizado</p>
                        <p className="text-xl font-bold text-foreground">
                          {servicoSelecionado.realizadoDia}{" "}
                          <span className="text-sm">{servicoSelecionado.unidade}</span>
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <Separator />

                {/* Acumulado */}
                <div className="space-y-3">
                  <h4 className="font-medium text-foreground">Acumulado</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="bg-muted/30">
                      <CardContent className="p-3 text-center">
                        <p className="text-xs text-muted-foreground">Planejado</p>
                        <p className="text-xl font-bold text-foreground">
                          {servicoSelecionado.acumuladoPlanejado.toLocaleString()}{" "}
                          <span className="text-sm">{servicoSelecionado.unidade}</span>
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="bg-muted/30">
                      <CardContent className="p-3 text-center">
                        <p className="text-xs text-muted-foreground">Realizado</p>
                        <p className="text-xl font-bold text-foreground">
                          {servicoSelecionado.acumuladoRealizado.toLocaleString()}{" "}
                          <span className="text-sm">{servicoSelecionado.unidade}</span>
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  <Card className="bg-muted/30">
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Desvio Acumulado</span>
                        <span
                          className={`text-lg font-bold ${servicoSelecionado.desvio >= 0 ? "text-primary" : "text-destructive"}`}
                        >
                          {servicoSelecionado.desvio > 0 ? "+" : ""}
                          {servicoSelecionado.desvio}%
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Separator />

                {/* Historico */}
                <div className="space-y-3">
                  <h4 className="font-medium text-foreground">Ultimos 5 Dias</h4>
                  <div className="space-y-2">
                    {historicoDiario.map((dia, index) => (
                      <Card key={index} className="bg-muted/30">
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">{dia.data}</span>
                            <div className="flex items-center gap-4">
                              <span className="text-sm text-foreground">Meta: {dia.planejado}%</span>
                              <span
                                className={`text-sm font-medium ${dia.realizado >= dia.planejado ? "text-primary" : "text-destructive"}`}
                              >
                                Real: {dia.realizado}%
                              </span>
                              {dia.realizado >= dia.planejado ? (
                                <CheckCircle className="w-4 h-4 text-primary" />
                              ) : (
                                <AlertTriangle className="w-4 h-4 text-destructive" />
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Recursos */}
                <div className="space-y-3">
                  <h4 className="font-medium text-foreground">Recursos Alocados</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="bg-muted/30">
                      <CardContent className="p-3">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-primary" />
                          <div>
                            <p className="text-xs text-muted-foreground">Equipes</p>
                            <p className="text-lg font-bold text-foreground">{servicoSelecionado.equipes}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-muted/30">
                      <CardContent className="p-3">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-primary" />
                          <div>
                            <p className="text-xs text-muted-foreground">Efetivo</p>
                            <p className="text-lg font-bold text-foreground">{servicoSelecionado.efetivo}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

export default function ProdutividadePage() {
  return (
    <Suspense fallback={null}>
      <ProdutividadeContent />
    </Suspense>
  )
}
