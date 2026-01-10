"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import { ComercialSidebar } from "./_components/comercial-sidebar"
import { ComercialTopBar } from "./_components/comercial-top-bar"
import { useComercial } from "@/contexts/comercial-context"
import Link from "next/link"
import {
  FileText,
  Plus,
  Building2,
  Calendar,
  DollarSign,
  TrendingUp,
  CheckCircle2,
  Target,
  Briefcase,
  ChevronRight,
  Activity,
  ArrowUpRight,
} from "lucide-react"

// ============================================================================
// COMPONENT
// ============================================================================

export default function ComercialCorporativoPage() {
  const { clientes, propostas, contratos, getDashboard } = useComercial()
  const [searchTerm, setSearchTerm] = useState("")
  
  const dashboard = getDashboard()
  const metricas = dashboard.kpis

  const formatCurrency = (value: number) => {
    if (value >= 1000000000) return `R$ ${(value / 1000000000).toFixed(1)} Bi`
    if (value >= 1000000) return `R$ ${(value / 1000000).toFixed(0)} Mi`
    return `R$ ${value.toLocaleString("pt-BR")}`
  }

  // Atividades recentes (derivadas de interações)
  const atividadesRecentes = clientes
    .flatMap((c) => c.historico.map((h) => ({ ...h, clienteNome: c.nome })))
    .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
    .slice(0, 5)

  // Próximas ações (derivadas de clientes)
  const proximasAcoes = clientes
    .filter((c) => c.proximaAcao && c.proximaAcaoData)
    .map((c) => ({
      id: c.id,
      titulo: c.proximaAcao!,
      prazo: new Date(c.proximaAcaoData!).toLocaleDateString("pt-BR"),
      prioridade: new Date(c.proximaAcaoData!).getTime() - Date.now() < 3 * 24 * 60 * 60 * 1000 ? "alta" : "media",
    }))
    .slice(0, 4)

  // Obras em destaque (contratos ativos)
  const obrasDestaque = contratos
    .filter((c) => c.status === "ativo")
    .slice(0, 3)
    .map((c) => ({
      id: c.id,
      nome: c.titulo,
      cliente: c.clienteNome,
      avanco: 67, // TODO: Calcular avanço real
      valor: c.valorAtual / 1000000,
      status: "execucao",
    }))

  return (
    <div className="flex h-screen bg-muted/30">
      {/* Sidebar */}
      <ComercialSidebar />

      {/* Conteúdo Principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <ComercialTopBar
          titulo="Visão Geral"
          searchPlaceholder="Buscar..."
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          actions={
            <Link href="/corporativo/comercial/propostas">
              <Button size="sm" className="h-7 text-xs gap-1.5">
                <Plus className="w-3.5 h-3.5" />
                Nova Proposta
              </Button>
            </Link>
          }
        />

        {/* Conteúdo */}
        <main className="flex-1 overflow-auto p-4">
          <div className="max-w-[1600px] mx-auto space-y-4">
            {/* Métricas principais */}
            <div className="grid grid-cols-6 gap-3">
              <Card className="p-3 border hover:border-primary/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{metricas.propostasAtivas}</p>
                    <p className="text-[10px] text-muted-foreground">Propostas Ativas</p>
                  </div>
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
              </Card>
              <Card className="p-3 border hover:border-primary/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{formatCurrency(metricas.pipelineTotal)}</p>
                    <p className="text-[10px] text-muted-foreground">Pipeline Total</p>
                  </div>
                  <DollarSign className="w-5 h-5 text-emerald-600" />
                </div>
              </Card>
              <Card className="p-3 border hover:border-primary/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{metricas.taxaConversao}%</p>
                    <p className="text-[10px] text-muted-foreground">Taxa Conversão</p>
                  </div>
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                </div>
              </Card>
              <Card className="p-3 border hover:border-primary/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{metricas.obrasAtivas}</p>
                    <p className="text-[10px] text-muted-foreground">Obras Ativas</p>
                  </div>
                  <Briefcase className="w-5 h-5 text-amber-600" />
                </div>
              </Card>
              <Card className="p-3 border hover:border-primary/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{metricas.clientesAtivos}</p>
                    <p className="text-[10px] text-muted-foreground">Clientes Ativos</p>
                  </div>
                  <Building2 className="w-5 h-5 text-cyan-600" />
                </div>
              </Card>
              <Card className="p-3 border hover:border-primary/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{metricas.propostas30dias}</p>
                    <p className="text-[10px] text-muted-foreground">Novas (30 dias)</p>
                  </div>
                  <Activity className="w-5 h-5 text-green-600" />
                </div>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Próximas Ações */}
              <Card className="border">
                <CardHeader className="py-3 px-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">Próximas Ações</CardTitle>
                    <Badge variant="outline" className="text-[10px]">
                      {proximasAcoes.length} pendentes
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-[200px]">
                    <div className="divide-y">
                      {proximasAcoes.map((acao) => (
                        <div key={acao.id} className="p-3 hover:bg-muted/50 transition-colors">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                              <p className="text-xs font-medium">{acao.titulo}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {acao.prazo}
                                </span>
                              </div>
                            </div>
                            <Badge
                              variant={acao.prioridade === "alta" ? "destructive" : "secondary"}
                              className="text-[10px]"
                            >
                              {acao.prioridade === "alta" ? "Alta" : "Média"}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Atividade Recente */}
              <Card className="border">
                <CardHeader className="py-3 px-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">Atividade Recente</CardTitle>
                    <Button variant="ghost" size="sm" className="h-6 text-[10px] px-2">
                      Ver tudo
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-[200px]">
                    <div className="divide-y">
                      {atividadesRecentes.map((atividade) => (
                        <div key={atividade.id} className="p-3">
                          <p className="text-xs">{atividade.descricao}</p>
                          <div className="flex items-center gap-2 mt-1 text-[10px] text-muted-foreground">
                            <span>{new Date(atividade.data).toLocaleDateString("pt-BR")}</span>
                            <span>•</span>
                            <span>{atividade.usuario}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Obras em Destaque */}
              <Card className="border">
                <CardHeader className="py-3 px-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">Obras em Destaque</CardTitle>
                    <Link href="/corporativo/comercial/portfolio">
                      <Button variant="ghost" size="sm" className="h-6 text-[10px] px-2 gap-1">
                        Ver portfólio
                        <ChevronRight className="w-3 h-3" />
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {obrasDestaque.map((obra) => (
                      <div key={obra.id} className="p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="text-xs font-medium">{obra.nome}</p>
                            <p className="text-[10px] text-muted-foreground">{obra.cliente}</p>
                          </div>
                          <span className="text-xs font-bold text-primary">R$ {obra.valor.toFixed(0)} Mi</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress value={obra.avanco} className="h-1.5 flex-1" />
                          <span className="text-[10px] text-muted-foreground w-8">{obra.avanco}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Acesso rápido */}
            <div className="grid grid-cols-4 gap-3">
              <Link href="/corporativo/comercial/propostas">
                <Card className="p-4 border hover:border-primary/50 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                      <FileText className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Propostas</p>
                      <p className="text-[10px] text-muted-foreground">Funil de vendas e oportunidades</p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 ml-auto text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Card>
              </Link>

              <Link href="/corporativo/comercial/clientes">
                <Card className="p-4 border hover:border-primary/50 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-cyan-500/10 group-hover:bg-cyan-500/20 transition-colors">
                      <Building2 className="w-5 h-5 text-cyan-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Clientes & CRM</p>
                      <p className="text-[10px] text-muted-foreground">Relacionamento e contatos</p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 ml-auto text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Card>
              </Link>

              <Link href="/corporativo/comercial/abertura-cc">
                <Card className="p-4 border hover:border-primary/50 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors">
                      <Target className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Abertura de CC</p>
                      <p className="text-[10px] text-muted-foreground">TAP e Centro de Custo</p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 ml-auto text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Card>
              </Link>

              <Link href="/corporativo/gate1">
                <Card className="p-4 border hover:border-primary/50 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors">
                      <CheckCircle2 className="w-5 h-5 text-purple-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Gate 1</p>
                      <p className="text-[10px] text-muted-foreground">Liberação para Obra</p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 ml-auto text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Card>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
