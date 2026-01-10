"use client"

import { useParams, useRouter } from "next/navigation"
import { useCicloEstrategico } from "@/contexts/ciclo-estrategico-context"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PageContent } from "@/components/layout/page-content"
import { Header } from "@/components/layout/header"
import {
  Globe,
  Shield,
  ListTodo,
  Grid,
  Target,
  Activity,
  CheckCircle2,
  Lock,
  ArrowRight,
} from "lucide-react"

export default function HubConstrucao() {
  const params = useParams()
  const router = useRouter()
  const cicloId = params.cicloId as string
  const { ciclos, pestel, swot, gut, bcg } = useCicloEstrategico()

  const ciclo = ciclos.find((c) => c.id === cicloId)

  if (!ciclo) {
    return (
      <>
        <Header title="Planejamento não encontrado" subtitle="" />
        <PageContent>
          <Button onClick={() => router.back()}>Voltar</Button>
        </PageContent>
      </>
    )
  }

  const analisePestel = pestel[cicloId]
  const analiseSwot = swot[cicloId]
  const matrizGut = gut[cicloId]
  const matrizBcg = bcg[cicloId]

  const etapas = [
    {
      id: "pestel",
      nome: "PESTEL",
      descricao: "Análise do ambiente externo",
      icon: Globe,
      color: "bg-blue-500",
      concluida: !!analisePestel?.concluidaEm,
      bloqueada: false,
      rota: `/corporativo/estrategico/planejamento/pestel/${cicloId}`,
      info: `${analisePestel?.fatores.length || 0} fatores identificados`,
    },
    {
      id: "swot",
      nome: "SWOT",
      descricao: "Posicionamento estratégico",
      icon: Shield,
      color: "bg-green-500",
      concluida: !!analiseSwot?.concluidaEm,
      bloqueada: !analisePestel?.concluidaEm,
      rota: `/corporativo/estrategico/planejamento/swot/${cicloId}`,
      info: `${
        (analiseSwot?.forcas.length || 0) +
        (analiseSwot?.fraquezas.length || 0) +
        (analiseSwot?.oportunidades.length || 0) +
        (analiseSwot?.ameacas.length || 0)
      } itens na matriz`,
    },
    {
      id: "gut",
      nome: "GUT",
      descricao: "Priorização estratégica",
      icon: ListTodo,
      color: "bg-purple-500",
      concluida: !!matrizGut?.concluidaEm,
      bloqueada: !analiseSwot?.concluidaEm,
      rota: `/corporativo/estrategico/planejamento/gut/${cicloId}`,
      info: `${matrizGut?.avaliacoes.length || 0} temas priorizados`,
    },
    {
      id: "bcg",
      nome: "BCG",
      descricao: "Matriz de portfólio",
      icon: Grid,
      color: "bg-amber-500",
      concluida: !!matrizBcg?.concluidaEm,
      bloqueada: !matrizGut?.concluidaEm,
      rota: `/corporativo/estrategico/planejamento/bcg/${cicloId}`,
      info: `${matrizBcg?.itens.length || 0} itens na matriz`,
    },
    {
      id: "okrs",
      nome: "OKRs",
      descricao: "Definição de objetivos",
      icon: Target,
      color: "bg-red-500",
      concluida: ciclo.etapasConcluidas.includes("okrs"),
      bloqueada: !matrizBcg?.concluidaEm,
      rota: `/corporativo/estrategico/planejamento/okrs/${cicloId}`,
      info: "Objetivos e Key Results",
    },
    {
      id: "monitoramento",
      nome: "Monitoramento",
      descricao: "Acompanhamento contínuo",
      icon: Activity,
      color: "bg-cyan-500",
      concluida: ciclo.etapasConcluidas.includes("monitoramento"),
      bloqueada: !ciclo.etapasConcluidas.includes("okrs"),
      rota: `/corporativo/estrategico/planejamento/monitoramento/${cicloId}`,
      info: "Dashboards e alertas",
    },
  ]

  const progresso = (etapas.filter((e) => e.concluida).length / etapas.length) * 100

  return (
    <>
      <Header
        title={`${ciclo.nome} › Construção do Planejamento`}
        subtitle="Navegue pelas etapas do workflow estratégico"
      />
      <PageContent>
        {/* Indicador de Progresso */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Progresso Geral</CardTitle>
                <CardDescription>
                  {etapas.filter((e) => e.concluida).length} de {etapas.length} etapas concluídas
                </CardDescription>
              </div>
              <span className="text-3xl font-bold text-primary">{Math.round(progresso)}%</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="w-full bg-muted rounded-full h-3">
              <div
                className="bg-primary h-3 rounded-full transition-all"
                style={{ width: `${progresso}%` }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Grid de Etapas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {etapas.map((etapa) => {
            const Icon = etapa.icon
            const bloqueada = etapa.bloqueada

            return (
              <Card
                key={etapa.id}
                className={`border transition-colors ${
                  bloqueada
                    ? "opacity-60 cursor-not-allowed"
                    : "hover:border-primary/50 cursor-pointer"
                }`}
                onClick={() => !bloqueada && router.push(etapa.rota)}
              >
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-3 rounded-lg ${etapa.color} text-white`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{etapa.nome}</CardTitle>
                    </div>
                    {etapa.concluida ? (
                      <CheckCircle2 className="h-6 w-6 text-green-600" />
                    ) : bloqueada ? (
                      <Lock className="h-6 w-6 text-muted-foreground" />
                    ) : (
                      <ArrowRight className="h-6 w-6 text-primary" />
                    )}
                  </div>
                  <CardDescription>{etapa.descricao}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{etapa.info}</span>
                    {etapa.concluida && (
                      <Badge variant="default" className="bg-green-600">
                        Concluída
                      </Badge>
                    )}
                    {bloqueada && (
                      <Badge variant="secondary">
                        Bloqueada
                      </Badge>
                    )}
                    {!etapa.concluida && !bloqueada && (
                      <Badge variant="outline">
                        Pendente
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Informações Adicionais */}
        <Card className="mt-6 bg-muted/30">
          <CardHeader>
            <CardTitle className="text-base">ℹ️ Como funciona o workflow?</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>
              <strong>1.</strong> Cada etapa deve ser concluída antes de avançar para a próxima
            </p>
            <p>
              <strong>2.</strong> Etapas bloqueadas serão liberadas automaticamente ao concluir a anterior
            </p>
            <p>
              <strong>3.</strong> Você pode voltar e revisar etapas concluídas a qualquer momento
            </p>
            <p>
              <strong>4.</strong> Clique em qualquer etapa disponível para começar ou continuar
            </p>
          </CardContent>
        </Card>

        {/* Botão Voltar */}
        <div className="mt-6">
          <Button variant="outline" onClick={() => router.push(`/corporativo/estrategico/planejamento/${cicloId}`)}>
            Voltar à Navegação
          </Button>
        </div>
      </PageContent>
    </>
  )
}
