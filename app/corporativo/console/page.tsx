"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Users,
  Shield,
  Key,
  Network,
  Bot,
  DollarSign,
  FileSearch,
  Headphones,
  Plug,
  Settings,
  LayoutDashboard,
  Search,
  Plus,
  AlertTriangle,
  CheckCircle2,
  Clock,
  UserPlus,
  UserMinus,
  Lock,
  Unlock,
  Edit,
  Eye,
  MoreHorizontal,
  ChevronRight,
  Building2,
  RefreshCw,
} from "lucide-react"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Navegacao do Console
const consoleNavigation = [
  { name: "Visao Geral", href: "/corporativo/console", icon: LayoutDashboard, active: true },
  { name: "Usuarios", href: "/corporativo/console/usuarios", icon: Users },
  { name: "Perfis de Acesso", href: "/corporativo/console/perfis", icon: Shield },
  { name: "Permissoes", href: "/corporativo/console/permissoes", icon: Key },
  { name: "Hierarquia & Aprovacoes", href: "/corporativo/console/hierarquia", icon: Network },
  { name: "IAs & Agentes", href: "/corporativo/console/ias", icon: Bot },
  { name: "Limites & Custos", href: "/corporativo/console/limites", icon: DollarSign },
  { name: "Auditoria", href: "/corporativo/console/auditoria", icon: FileSearch },
  { name: "Suporte", href: "/corporativo/console/suporte", icon: Headphones },
  { name: "Integracoes", href: "/corporativo/console/integracoes", icon: Plug },
  { name: "Parametros", href: "/corporativo/console/parametros", icon: Settings },
]

// Mock data - KPIs
const kpis = [
  { label: "Usuarios Ativos", value: 347, icon: Users, trend: "+12", color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Usuarios Bloqueados", value: 8, icon: Lock, trend: "-2", color: "text-red-600", bg: "bg-red-50" },
  { label: "Perfis de Acesso", value: 24, icon: Shield, trend: "+1", color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Permissoes Criticas", value: 156, icon: Key, trend: "0", color: "text-amber-600", bg: "bg-amber-50" },
  { label: "Aprovacoes Pendentes", value: 23, icon: Clock, trend: "+5", color: "text-orange-600", bg: "bg-orange-50" },
  { label: "Agentes IA Ativos", value: 12, icon: Bot, trend: "+3", color: "text-purple-600", bg: "bg-purple-50" },
  {
    label: "Consumo IA (mes)",
    value: "R$ 4.2k",
    icon: DollarSign,
    trend: "+18%",
    color: "text-cyan-600",
    bg: "bg-cyan-50",
  },
  { label: "Alertas Seguranca", value: 3, icon: AlertTriangle, trend: "-1", color: "text-rose-600", bg: "bg-rose-50" },
]

// Mock data - Atividade recente
const atividadeRecente = [
  {
    id: 1,
    tipo: "usuario_criado",
    descricao: "Novo usuario criado: Maria Santos",
    usuario: "Admin",
    data: "09/01/2026 14:32",
    icone: UserPlus,
    cor: "text-emerald-600",
  },
  {
    id: 2,
    tipo: "perfil_alterado",
    descricao: "Perfil 'Gerente de Obra' atualizado - novas permissoes",
    usuario: "Admin",
    data: "09/01/2026 13:45",
    icone: Edit,
    cor: "text-blue-600",
  },
  {
    id: 3,
    tipo: "usuario_bloqueado",
    descricao: "Usuario bloqueado: Jose Pereira (tentativas de login)",
    usuario: "Sistema",
    data: "09/01/2026 11:20",
    icone: Lock,
    cor: "text-red-600",
  },
  {
    id: 4,
    tipo: "aprovacao",
    descricao: "Aprovacao de alcada concedida: R$ 500.000 para Carlos Silva",
    usuario: "Diretor Financeiro",
    data: "09/01/2026 10:15",
    icone: CheckCircle2,
    cor: "text-emerald-600",
  },
  {
    id: 5,
    tipo: "ia_config",
    descricao: "Agente IA 'Hermes' configurado para obras do Nordeste",
    usuario: "Admin",
    data: "09/01/2026 09:30",
    icone: Bot,
    cor: "text-purple-600",
  },
  {
    id: 6,
    tipo: "usuario_desbloqueado",
    descricao: "Usuario desbloqueado: Ana Costa (solicitacao suporte)",
    usuario: "Admin",
    data: "08/01/2026 17:45",
    icone: Unlock,
    cor: "text-amber-600",
  },
  {
    id: 7,
    tipo: "permissao_critica",
    descricao: "Permissao critica atribuida: 'Aprovar Medicoes > R$ 1M'",
    usuario: "Admin",
    data: "08/01/2026 16:20",
    icone: Key,
    cor: "text-rose-600",
  },
  {
    id: 8,
    tipo: "integracao",
    descricao: "Integracao com SAP atualizada - sync de usuarios",
    usuario: "Sistema",
    data: "08/01/2026 14:00",
    icone: Plug,
    cor: "text-cyan-600",
  },
  {
    id: 9,
    tipo: "usuario_removido",
    descricao: "Usuario desativado: Roberto Lima (desligamento)",
    usuario: "RH",
    data: "08/01/2026 11:30",
    icone: UserMinus,
    cor: "text-gray-600",
  },
  {
    id: 10,
    tipo: "parametro",
    descricao: "Parametro 'Timeout Sessao' alterado: 30min -> 60min",
    usuario: "Admin",
    data: "08/01/2026 09:00",
    icone: Settings,
    cor: "text-slate-600",
  },
]

// Mock data - Alertas de seguranca
const alertasSeguranca = [
  {
    id: 1,
    tipo: "critico",
    titulo: "Tentativas de login suspeitas",
    descricao: "5 tentativas falhas do IP 192.168.1.100",
    data: "09/01/2026 14:00",
  },
  {
    id: 2,
    tipo: "medio",
    titulo: "Permissao critica sem revisao",
    descricao: "3 usuarios com acesso 'Super Admin' sem revisao ha 90 dias",
    data: "09/01/2026 10:00",
  },
  {
    id: 3,
    tipo: "baixo",
    titulo: "Usuarios inativos",
    descricao: "12 usuarios sem acesso ha mais de 60 dias",
    data: "08/01/2026 08:00",
  },
]

export default function ConsolePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeNav, setActiveNav] = useState("Visao Geral")

  return (
    <div className="flex h-screen bg-muted/30">
      {/* Sidebar do Console */}
      <aside className="w-64 bg-background border-r flex flex-col">
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-semibold text-sm">Console Administrativo</h1>
              <p className="text-xs text-muted-foreground">ERP Construcao Civil</p>
            </div>
          </div>
        </div>

        <ScrollArea className="flex-1 py-2">
          <nav className="px-2 space-y-1">
            {consoleNavigation.map((item) => {
              const Icon = item.icon
              const isActive = item.name === activeNav
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setActiveNav(item.name)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </ScrollArea>

        <div className="p-4 border-t">
          <div className="flex items-center gap-2">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-primary/10 text-primary text-xs">AD</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Administrador</p>
              <p className="text-xs text-muted-foreground truncate">admin@empresa.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Conteudo Principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-14 bg-background border-b flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            {/* Seletor de Contexto */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-md">
              <Building2 className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Corporativo</span>
              <Badge variant="secondary" className="text-[10px] px-1.5">
                Unico
              </Badge>
            </div>

            {/* Busca Global */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar usuarios, perfis, permissoes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-80 pl-9 h-9"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Plus className="w-4 h-4" />
              Criar Usuario
            </Button>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Shield className="w-4 h-4" />
              Criar Perfil
            </Button>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <FileSearch className="w-4 h-4" />
              Auditoria
            </Button>
          </div>
        </header>

        {/* Conteudo */}
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-[1600px] mx-auto space-y-6">
            {/* Titulo */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">Visao Geral</h1>
                <p className="text-muted-foreground">Painel de controle administrativo do sistema</p>
              </div>
              <Button variant="ghost" size="sm" className="gap-2">
                <RefreshCw className="w-4 h-4" />
                Atualizar
              </Button>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {kpis.map((kpi, index) => {
                const Icon = kpi.icon
                return (
                  <Card key={index} className="relative overflow-hidden">
                    <CardContent className="p-4">
                      <div className={`w-8 h-8 rounded-lg ${kpi.bg} flex items-center justify-center mb-2`}>
                        <Icon className={`w-4 h-4 ${kpi.color}`} />
                      </div>
                      <p className="text-2xl font-bold">{kpi.value}</p>
                      <p className="text-xs text-muted-foreground">{kpi.label}</p>
                      {kpi.trend !== "0" && (
                        <Badge
                          variant={kpi.trend.startsWith("+") ? "default" : "secondary"}
                          className="absolute top-2 right-2 text-[10px] px-1.5"
                        >
                          {kpi.trend}
                        </Badge>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Atividade Recente */}
              <Card className="lg:col-span-2">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base">Atividade Recente</CardTitle>
                      <CardDescription>Ultimas 10 alteracoes administrativas</CardDescription>
                    </div>
                    <Button variant="ghost" size="sm" className="gap-1 text-xs">
                      Ver todas <ChevronRight className="w-3 h-3" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-4">
                      {atividadeRecente.map((atividade) => {
                        const Icon = atividade.icone
                        return (
                          <div key={atividade.id} className="flex gap-3">
                            <div
                              className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0`}
                            >
                              <Icon className={`w-4 h-4 ${atividade.cor}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm">{atividade.descricao}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-muted-foreground">{atividade.usuario}</span>
                                <span className="text-xs text-muted-foreground">•</span>
                                <span className="text-xs text-muted-foreground">{atividade.data}</span>
                              </div>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="w-4 h-4 mr-2" />
                                  Ver detalhes
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <FileSearch className="w-4 h-4 mr-2" />
                                  Ir para auditoria
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        )
                      })}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Alertas de Seguranca */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base">Alertas de Seguranca</CardTitle>
                      <CardDescription>Itens que requerem atencao</CardDescription>
                    </div>
                    <Badge variant="destructive" className="text-[10px]">
                      3
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {alertasSeguranca.map((alerta) => (
                      <div
                        key={alerta.id}
                        className={`p-3 rounded-lg border ${
                          alerta.tipo === "critico"
                            ? "border-red-200 bg-red-50"
                            : alerta.tipo === "medio"
                              ? "border-amber-200 bg-amber-50"
                              : "border-gray-200 bg-gray-50"
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          <AlertTriangle
                            className={`w-4 h-4 mt-0.5 ${
                              alerta.tipo === "critico"
                                ? "text-red-600"
                                : alerta.tipo === "medio"
                                  ? "text-amber-600"
                                  : "text-gray-600"
                            }`}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium">{alerta.titulo}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{alerta.descricao}</p>
                            <p className="text-xs text-muted-foreground mt-1">{alerta.data}</p>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-2">
                          <Button variant="outline" size="sm" className="h-7 text-xs flex-1 bg-transparent">
                            Ignorar
                          </Button>
                          <Button size="sm" className="h-7 text-xs flex-1">
                            Resolver
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Resumo por Area */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-600" />
                    Usuarios por Perfil
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Gerente de Obra</span>
                      <span className="font-medium">45</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Engenheiro</span>
                      <span className="font-medium">78</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Administrativo</span>
                      <span className="font-medium">120</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Diretor</span>
                      <span className="font-medium">12</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Outros</span>
                      <span className="font-medium">92</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Bot className="w-4 h-4 text-purple-600" />
                    Agentes IA
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Hermes (Assistente)</span>
                      <Badge variant="default" className="text-[10px]">
                        Ativo
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Analista de Docs</span>
                      <Badge variant="default" className="text-[10px]">
                        Ativo
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Validador NFs</span>
                      <Badge variant="default" className="text-[10px]">
                        Ativo
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Previsor de Custos</span>
                      <Badge variant="secondary" className="text-[10px]">
                        Parado
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Plug className="w-4 h-4 text-cyan-600" />
                    Integracoes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">SAP</span>
                      <Badge variant="default" className="text-[10px] bg-emerald-600">
                        Conectado
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Banco (Pagamentos)</span>
                      <Badge variant="default" className="text-[10px] bg-emerald-600">
                        Conectado
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Ponto Eletronico</span>
                      <Badge variant="default" className="text-[10px] bg-emerald-600">
                        Conectado
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">eSocial</span>
                      <Badge variant="secondary" className="text-[10px]">
                        Pendente
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Headphones className="w-4 h-4 text-orange-600" />
                    Suporte
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Tickets Abertos</span>
                      <span className="font-medium">7</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Aguardando Resp.</span>
                      <span className="font-medium text-amber-600">3</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Resolvidos (mes)</span>
                      <span className="font-medium text-emerald-600">42</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Tempo medio</span>
                      <span className="font-medium">4.2h</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
