"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  FileText,
  Search,
  Plus,
  Building2,
  Calendar,
  DollarSign,
  TrendingUp,
  CheckCircle2,
  Target,
  Briefcase,
  ChevronRight,
  FolderKanban,
  PieChart,
  LayoutDashboard,
  Activity,
  ArrowUpRight,
} from "lucide-react"

// Navegacao do Comercial Corporativo
const comercialNavigation = [
  { name: "Visao Geral", href: "/corporativo/comercial", icon: LayoutDashboard },
  { name: "Propostas", href: "/corporativo/comercial/propostas", icon: FileText },
  { name: "Clientes & CRM", href: "/corporativo/comercial/clientes", icon: Building2 },
  { name: "Contratos", href: "/corporativo/comercial/contratos", icon: FolderKanban },
  { name: "Portfolio de Obras", href: "/corporativo/comercial/portfolio", icon: Briefcase },
  { name: "Abertura de CC", href: "/corporativo/comercial/abertura-cc", icon: Target },
  { name: "Analytics", href: "/corporativo/comercial/analytics", icon: PieChart },
]

// Mock data
const metricas = {
  propostasAtivas: 7,
  pipelineTotal: 3340000000,
  taxaConversao: 68,
  obrasAtivas: 4,
  clientesAtivos: 12,
  propostas30dias: 3,
}

const atividadesRecentes = [
  {
    id: 1,
    tipo: "proposta",
    descricao: "Nova proposta criada: Metro Linha 6",
    data: "09/01 14:30",
    usuario: "Maria Santos",
  },
  { id: 2, tipo: "cliente", descricao: "Reunião agendada com CCR Ponte", data: "09/01 11:20", usuario: "João Silva" },
  {
    id: 3,
    tipo: "contrato",
    descricao: "Contrato SP-330 em revisão jurídica",
    data: "09/01 10:15",
    usuario: "Jurídico",
  },
  {
    id: 4,
    tipo: "proposta",
    descricao: "Proposta Terminal Santos atualizada",
    data: "08/01 16:45",
    usuario: "Carlos Lima",
  },
  { id: 5, tipo: "gate", descricao: "Gate 1 aprovado: BR-101 Lote 3", data: "08/01 09:30", usuario: "Diretoria" },
]

const proximasAcoes = [
  { id: 1, titulo: "Enviar proposta UHE Rio Verde", prazo: "10/01", prioridade: "alta" },
  { id: 2, titulo: "Reunião SABESP - Expansão Zona Leste", prazo: "11/01", prioridade: "alta" },
  { id: 3, titulo: "Visita técnica Porto Santos", prazo: "15/01", prioridade: "media" },
  { id: 4, titulo: "Finalizar TAP - Restauração SP-330", prazo: "12/01", prioridade: "alta" },
]

const obrasDestaque = [
  { id: 1, nome: "BR-101 Lote 3", cliente: "DNIT", avanco: 67, valor: 450, status: "execucao" },
  { id: 2, nome: "SES Metro Sul", cliente: "SABESP", avanco: 45, valor: 180, status: "execucao" },
  { id: 3, nome: "UHE Belo Monte", cliente: "Furnas", avanco: 92, valor: 890, status: "finalizacao" },
]

export default function ComercialCorporativoPage() {
  const pathname = usePathname()
  const [searchTerm, setSearchTerm] = useState("")

  const formatCurrency = (value: number) => {
    if (value >= 1000000000) return `R$ ${(value / 1000000000).toFixed(1)} Bi`
    if (value >= 1000000) return `R$ ${(value / 1000000).toFixed(0)} Mi`
    return `R$ ${value.toLocaleString("pt-BR")}`
  }

  return (
    <div className="flex h-screen bg-muted/30">
      {/* Sidebar do Comercial */}
      <aside className="w-56 bg-background border-r flex flex-col">
        <div className="p-3 border-b">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-primary rounded flex items-center justify-center">
              <Briefcase className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-semibold text-sm">Comercial</h1>
              <p className="text-[10px] text-muted-foreground">Corporativo</p>
            </div>
          </div>
        </div>

        <ScrollArea className="flex-1 py-1">
          <nav className="px-2 space-y-0.5">
            {comercialNavigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-2 py-1.5 rounded text-xs transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </ScrollArea>

        <div className="p-2 border-t">
          <div className="flex items-center gap-2 px-2 py-1">
            <Avatar className="w-6 h-6">
              <AvatarFallback className="bg-primary/10 text-primary text-[10px]">JS</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium truncate">João Silva</p>
              <p className="text-[10px] text-muted-foreground truncate">Gerente Comercial</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Conteudo Principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-12 bg-background border-b flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-2 py-1 bg-muted rounded text-xs">
              <Building2 className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="font-medium">Corporativo</span>
            </div>
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <Input
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64 pl-7 h-8 text-xs"
              />
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <Link href="/corporativo/comercial/propostas">
              <Button size="sm" className="h-7 text-xs gap-1.5">
                <Plus className="w-3.5 h-3.5" />
                Nova Proposta
              </Button>
            </Link>
          </div>
        </header>

        {/* Conteudo */}
        <main className="flex-1 overflow-auto p-4">
          <div className="max-w-[1600px] mx-auto space-y-4">
            {/* Metricas principais */}
            <div className="grid grid-cols-6 gap-3">
              <Card className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{metricas.propostasAtivas}</p>
                    <p className="text-[10px] text-muted-foreground">Propostas Ativas</p>
                  </div>
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
              </Card>
              <Card className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{formatCurrency(metricas.pipelineTotal)}</p>
                    <p className="text-[10px] text-muted-foreground">Pipeline Total</p>
                  </div>
                  <DollarSign className="w-5 h-5 text-emerald-600" />
                </div>
              </Card>
              <Card className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{metricas.taxaConversao}%</p>
                    <p className="text-[10px] text-muted-foreground">Taxa Conversão</p>
                  </div>
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                </div>
              </Card>
              <Card className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{metricas.obrasAtivas}</p>
                    <p className="text-[10px] text-muted-foreground">Obras Ativas</p>
                  </div>
                  <Briefcase className="w-5 h-5 text-amber-600" />
                </div>
              </Card>
              <Card className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{metricas.clientesAtivos}</p>
                    <p className="text-[10px] text-muted-foreground">Clientes Ativos</p>
                  </div>
                  <Building2 className="w-5 h-5 text-cyan-600" />
                </div>
              </Card>
              <Card className="p-3">
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
              {/* Proximas Acoes */}
              <Card>
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
                        <div key={acao.id} className="p-3 hover:bg-muted/50">
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
              <Card>
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
                            <span>{atividade.data}</span>
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
              <Card>
                <CardHeader className="py-3 px-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">Obras em Destaque</CardTitle>
                    <Link href="/corporativo/comercial/portfolio">
                      <Button variant="ghost" size="sm" className="h-6 text-[10px] px-2 gap-1">
                        Ver portfolio
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
                          <span className="text-xs font-bold text-primary">R$ {obra.valor} Mi</span>
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

            {/* Acesso rapido */}
            <div className="grid grid-cols-4 gap-3">
              <Link href="/corporativo/comercial/propostas">
                <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer group">
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
                <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer group">
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
                <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer group">
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
                <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer group">
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
