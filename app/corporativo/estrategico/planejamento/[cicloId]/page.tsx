"use client"

import { useParams, useRouter } from "next/navigation"
import { useCicloEstrategico } from "@/contexts/ciclo-estrategico-context"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PageContent } from "@/components/layout/page-content"
import { Header } from "@/components/layout/header"
import { AcoesCicloCard } from "../_components/acoes-ciclo-card"
import {
  TrendingUp,
  DollarSign,
  Handshake,
  Building2,
  Users,
  Cog,
  BarChart3,
  ArrowRight,
  Target,
  Activity,
} from "lucide-react"
import type { Departamento } from "@/lib/types/planejamento"

interface DepartmentCardData {
  departamento: Departamento
  nome: string
  descricao: string
  icon: any
  color: string
  stats: {
    okrs: number
    progresso: number
  }
}

export default function NavegacaoContextual() {
  const params = useParams()
  const router = useRouter()
  const cicloId = params.cicloId as string
  const { ciclos, getDesdobramento } = useCicloEstrategico()

  const ciclo = ciclos.find((c) => c.id === cicloId)
  const desdobramento = getDesdobramento(cicloId)

  if (!ciclo) {
    return (
      <>
        <Header title="Planejamento não encontrado" subtitle="O ciclo solicitado não existe" />
        <PageContent>
          <Card>
            <CardContent className="py-12 text-center">
              <p>Ciclo não encontrado</p>
              <Button onClick={() => router.push("/corporativo/estrategico/planejamento")} className="mt-4">
                Voltar
              </Button>
            </CardContent>
          </Card>
        </PageContent>
      </>
    )
  }

  // Dados dos departamentos
  const departamentos: DepartmentCardData[] = [
    {
      departamento: "financeiro",
      nome: "Financeiro",
      descricao: "Estratégia financeira, OKRs de margem, custos e receita",
      icon: DollarSign,
      color: "text-emerald-600 bg-emerald-50 border-emerald-200",
      stats: {
        okrs: desdobramento?.departamentos.find((d) => d.departamento === "financeiro")?.okrs.length || 8,
        progresso: 72,
      },
    },
    {
      departamento: "comercial",
      nome: "Comercial",
      descricao: "Captação, novos clientes, propostas e contratos",
      icon: Handshake,
      color: "text-blue-600 bg-blue-50 border-blue-200",
      stats: {
        okrs: desdobramento?.departamentos.find((d) => d.departamento === "comercial")?.okrs.length || 12,
        progresso: 68,
      },
    },
    {
      departamento: "obras",
      nome: "Obras",
      descricao: "Execução, cronogramas, produtividade e qualidade",
      icon: Building2,
      color: "text-orange-600 bg-orange-50 border-orange-200",
      stats: {
        okrs: desdobramento?.departamentos.find((d) => d.departamento === "obras")?.okrs.length || 15,
        progresso: 55,
      },
    },
    {
      departamento: "rh",
      nome: "Recursos Humanos",
      descricao: "Pessoas, treinamento, clima e desenvolvimento",
      icon: Users,
      color: "text-purple-600 bg-purple-50 border-purple-200",
      stats: {
        okrs: desdobramento?.departamentos.find((d) => d.departamento === "rh")?.okrs.length || 7,
        progresso: 85,
      },
    },
    {
      departamento: "operacoes",
      nome: "Operações",
      descricao: "Processos, eficiência operacional e suprimentos",
      icon: Cog,
      color: "text-gray-600 bg-gray-50 border-gray-200",
      stats: {
        okrs: desdobramento?.departamentos.find((d) => d.departamento === "operacoes")?.okrs.length || 5,
        progresso: 62,
      },
    },
  ]

  const handleNavigate = (departamento: Departamento) => {
    router.push(`/corporativo/estrategico/planejamento/${cicloId}/${departamento}`)
  }

  const handleAnalytics = () => {
    router.push(`/corporativo/estrategico/planejamento/${cicloId}/analytics`)
  }

  return (
    <>
      <Header
        title={ciclo.nome}
        subtitle="Selecione a visão departamental ou acesse a análise consolidada"
      />
      <PageContent>
        {/* KPIs Consolidados */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="border-l-4 border-l-primary">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">OKRs Totais</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">
                  {departamentos.reduce((acc, d) => acc + d.stats.okrs, 0)}
                </span>
                <Target className="h-8 w-8 text-primary/50" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-emerald-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Progresso Médio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-emerald-600">
                  {Math.round(departamentos.reduce((acc, d) => acc + d.stats.progresso, 0) / departamentos.length)}%
                </span>
                <TrendingUp className="h-8 w-8 text-emerald-500/50" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Departamentos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-blue-600">{departamentos.length}</span>
                <Activity className="h-8 w-8 text-blue-500/50" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-amber-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Em Risco</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-amber-600">5</span>
                <BarChart3 className="h-8 w-8 text-amber-500/50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Ações do Ciclo */}
        {ciclo && ciclo.status !== "em_execucao" && ciclo.status !== "encerrado" && (
          <div className="mb-6">
            <AcoesCicloCard ciclo={ciclo} />
          </div>
        )}

        {/* Hub de Construção */}
        {ciclo && ciclo.status !== "em_execucao" && ciclo.status !== "encerrado" && (
          <Card className="mb-6 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/30 cursor-pointer hover:border-primary transition-colors" onClick={() => router.push(`/corporativo/estrategico/planejamento/${cicloId}/construcao`)}>
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary text-primary-foreground">
                  <Target className="h-8 w-8" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-xl">🛠️ Hub de Construção do Planejamento</CardTitle>
                  <CardDescription>Navegue pelas etapas: PESTEL → SWOT → GUT → BCG → OKRs → Monitoramento</CardDescription>
                </div>
                <ArrowRight className="h-6 w-6 text-primary" />
              </div>
            </CardHeader>
          </Card>
        )}

        {/* Título */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Visões Disponíveis</h2>
          <p className="text-sm text-muted-foreground">
            Selecione Analytics para visão consolidada ou um departamento específico
          </p>
        </div>

        {/* Cards de Departamentos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departamentos.map((dept) => {
            const Icon = dept.icon
            const progressoColor =
              dept.stats.progresso >= 70
                ? "text-emerald-600"
                : dept.stats.progresso >= 50
                ? "text-blue-600"
                : "text-amber-600"

            return (
              <Card
                key={dept.departamento}
                className="cursor-pointer border hover:border-primary/50 transition-colors"
                onClick={() => handleNavigate(dept.departamento)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className={`p-3 rounded-lg border ${dept.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {dept.stats.okrs} OKRs
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{dept.nome}</CardTitle>
                  <CardDescription>{dept.descricao}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {/* Progresso */}
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Progresso</span>
                        <span className={`font-bold ${progressoColor}`}>{dept.stats.progresso}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            dept.stats.progresso >= 70
                              ? "bg-green-600"
                              : dept.stats.progresso >= 50
                              ? "bg-blue-600"
                              : "bg-amber-600"
                          }`}
                          style={{ width: `${dept.stats.progresso}%` }}
                        />
                      </div>
                    </div>

                    {/* Botão */}
                    <Button variant="outline" className="w-full gap-2 mt-4">
                      Acessar {dept.nome}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}

          {/* Card Analytics */}
          <Card
            className="cursor-pointer border-2 border-primary hover:border-primary/70 transition-colors"
            onClick={handleAnalytics}
          >
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <div className="p-3 rounded-lg border-2 border-primary">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <Badge className="bg-primary text-white">Visão Global</Badge>
              </div>
              <CardTitle className="text-xl">Analytics</CardTitle>
              <CardDescription>
                Visão consolidada de todos os departamentos e relatórios
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {/* Stats */}
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="p-2 rounded border bg-card">
                    <p className="text-xs text-muted-foreground">Departamentos</p>
                    <p className="text-lg font-bold">{departamentos.length}</p>
                  </div>
                  <div className="p-2 rounded border bg-card">
                    <p className="text-xs text-muted-foreground">Progresso Médio</p>
                    <p className="text-lg font-bold text-green-600">
                      {Math.round(departamentos.reduce((acc, d) => acc + d.stats.progresso, 0) / departamentos.length)}%
                    </p>
                  </div>
                </div>

                {/* Botão */}
                <Button className="w-full gap-2 mt-4">
                  Acessar Analytics
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </PageContent>
    </>
  )
}
