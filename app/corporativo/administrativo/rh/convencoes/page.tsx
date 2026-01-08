"use client"

import { Suspense, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { RHNav } from "@/components/rh/rh-nav"
import {
  FileText,
  Search,
  Plus,
  Eye,
  Clock,
  CheckCircle2,
  AlertTriangle,
  MapPin,
  Calendar,
  History,
  Shield,
  Briefcase,
  Timer,
  Percent,
  Gift,
  Settings,
  ChevronLeft,
  Lock,
  Unlock,
  Send,
} from "lucide-react"

// Dados mockados - Convenções
const convencoesMock = [
  {
    id: "CC-SP-2025",
    nome: "Convenção Coletiva SP 2025",
    sindicato: "Sindicato da Construção Civil SP",
    estado: "SP",
    cidade: "São Paulo - Capital",
    tipoAplicacao: "Empresa",
    vigenciaInicial: "2025-01-01",
    vigenciaFinal: "2025-12-31",
    versao: "3.0",
    status: "ativa",
    dataAprovacao: "2024-12-15",
    aprovadoPor: "Maria Silva",
    obras: 12,
    pessoas: 856,
  },
  {
    id: "CC-RJ-2025",
    nome: "Convenção Coletiva RJ 2025",
    sindicato: "Sindicato da Construção Civil RJ",
    estado: "RJ",
    cidade: "Rio de Janeiro - Capital",
    tipoAplicacao: "Obra",
    vigenciaInicial: "2025-01-01",
    vigenciaFinal: "2025-12-31",
    versao: "2.1",
    status: "ativa",
    dataAprovacao: "2024-12-20",
    aprovadoPor: "João Santos",
    obras: 8,
    pessoas: 534,
  },
  {
    id: "CC-TERC-ALPHA",
    nome: "Convenção Terceirizados Alpha",
    sindicato: "Sindicato dos Serviços",
    estado: "SP",
    cidade: "São Paulo - Grande SP",
    tipoAplicacao: "Prestadora",
    vigenciaInicial: "2025-02-01",
    vigenciaFinal: "2026-01-31",
    versao: "1.0",
    status: "em_aprovacao",
    dataAprovacao: null,
    aprovadoPor: null,
    obras: 0,
    pessoas: 0,
  },
  {
    id: "CC-MG-2024",
    nome: "Convenção Coletiva MG 2024",
    sindicato: "Sindicato da Construção Civil MG",
    estado: "MG",
    cidade: "Belo Horizonte",
    tipoAplicacao: "Empresa",
    vigenciaInicial: "2024-01-01",
    vigenciaFinal: "2024-12-31",
    versao: "2.0",
    status: "expirada",
    dataAprovacao: "2023-12-10",
    aprovadoPor: "Carlos Oliveira",
    obras: 0,
    pessoas: 0,
  },
]

// Dados mockados - Jornada & Ponto
const jornadaMock = {
  horasDiarias: 8,
  horasSemanais: 44,
  diasSemana: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
  intervaloMinimo: 60,
  toleranciaEntrada: 10,
  toleranciaSaida: 10,
  bancoHorasPermitido: true,
  compensacaoSabado: true,
  jornadaFlexivel: false,
}

// Dados mockados - Horas Extras
const horasExtrasMock = [
  { tipo: "Hora Extra Comum (Seg-Sex)", percentual: 60, limite: 2 },
  { tipo: "Hora Extra Sábado", percentual: 70, limite: 4 },
  { tipo: "Hora Extra Domingo/Feriado", percentual: 100, limite: 8 },
  { tipo: "Hora Noturna (22h-05h)", percentual: 20, limite: null },
  { tipo: "Hora Extra Noturna", percentual: 120, limite: 2 },
]

// Dados mockados - Benefícios
const beneficiosMock = [
  { nome: "Vale Transporte", obrigatorio: true, valor: null, tipo: "Desconto 6%" },
  { nome: "Vale Refeição", obrigatorio: true, valor: 35.0, tipo: "Por dia trabalhado" },
  { nome: "Cesta Básica", obrigatorio: true, valor: 280.0, tipo: "Mensal" },
  { nome: "Plano de Saúde", obrigatorio: false, valor: null, tipo: "Coparticipação" },
  { nome: "Seguro de Vida", obrigatorio: true, valor: null, tipo: "Custeio integral" },
  { nome: "PLR", obrigatorio: false, valor: null, tipo: "Conforme meta" },
]

// Dados mockados - Regras Operacionais
const regrasOperacionaisMock = [
  { regra: "Adicional de Periculosidade", valor: "30% do salário base", aplicacao: "Automática" },
  { regra: "Adicional de Insalubridade", valor: "10%, 20% ou 40% SM", aplicacao: "Por laudo" },
  { regra: "Adicional Noturno", valor: "20% hora normal", aplicacao: "Automática" },
  { regra: "Piso Salarial - Servente", valor: "R$ 2.118,00", aplicacao: "Obrigatório" },
  { regra: "Piso Salarial - Pedreiro", valor: "R$ 2.650,00", aplicacao: "Obrigatório" },
  { regra: "Piso Salarial - Encarregado", valor: "R$ 4.200,00", aplicacao: "Obrigatório" },
  { regra: "Reajuste Anual", valor: "INPC + 1%", aplicacao: "Data-base" },
]

// Dados mockados - Histórico de Versões
const historicoVersoesMock = [
  {
    versao: "3.0",
    data: "2024-12-15",
    autor: "Maria Silva",
    alteracoes: "Atualização pisos salariais 2025",
    status: "ativa",
  },
  {
    versao: "2.1",
    data: "2024-06-10",
    autor: "João Santos",
    alteracoes: "Correção VR e cesta básica",
    status: "substituida",
  },
  {
    versao: "2.0",
    data: "2024-01-05",
    autor: "Carlos Oliveira",
    alteracoes: "Reajuste anual INPC",
    status: "substituida",
  },
  { versao: "1.0", data: "2023-01-10", autor: "Maria Silva", alteracoes: "Versão inicial", status: "substituida" },
]

// Dados mockados - Aprovações pendentes
const aprovacoesPendentesMock = [
  {
    etapa: "Jurídico Trabalhista",
    responsavel: "Dr. Paulo Mendes",
    status: "aprovado",
    data: "2025-01-05",
    parecer: "Conforme legislação vigente",
  },
  {
    etapa: "RH Corporativo",
    responsavel: "Maria Silva",
    status: "aprovado",
    data: "2025-01-06",
    parecer: "Valores compatíveis com orçamento",
  },
  { etapa: "Diretoria Financeira", responsavel: "Roberto Lima", status: "pendente", data: null, parecer: null },
  { etapa: "Diretoria Geral", responsavel: "Ana Costa", status: "aguardando", data: null, parecer: null },
]

function ConvencoesContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("todos")
  const [selectedConvencao, setSelectedConvencao] = useState<(typeof convencoesMock)[0] | null>(null)
  const [activeTab, setActiveTab] = useState("dados")
  const [showNewConvencao, setShowNewConvencao] = useState(false)

  const filteredConvencoes = convencoesMock.filter((conv) => {
    const matchSearch =
      conv.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.sindicato.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchStatus = statusFilter === "todos" || conv.status === statusFilter
    return matchSearch && matchStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ativa":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Ativa</Badge>
      case "em_aprovacao":
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Em Aprovação</Badge>
      case "expirada":
        return <Badge className="bg-zinc-500/20 text-zinc-400 border-zinc-500/30">Expirada</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getTipoAplicacaoBadge = (tipo: string) => {
    switch (tipo) {
      case "Empresa":
        return (
          <Badge variant="outline" className="border-blue-500/30 text-blue-400">
            Empresa
          </Badge>
        )
      case "Obra":
        return (
          <Badge variant="outline" className="border-purple-500/30 text-purple-400">
            Obra
          </Badge>
        )
      case "Prestadora":
        return (
          <Badge variant="outline" className="border-orange-500/30 text-orange-400">
            Prestadora
          </Badge>
        )
      default:
        return <Badge variant="outline">{tipo}</Badge>
    }
  }

  const getAprovacaoStatusIcon = (status: string) => {
    switch (status) {
      case "aprovado":
        return <CheckCircle2 className="h-4 w-4 text-green-400" />
      case "pendente":
        return <Clock className="h-4 w-4 text-yellow-400" />
      case "aguardando":
        return <Lock className="h-4 w-4 text-zinc-500" />
      default:
        return <AlertTriangle className="h-4 w-4 text-red-400" />
    }
  }

  // Contadores
  const totalAtivas = convencoesMock.filter((c) => c.status === "ativa").length
  const totalEmAprovacao = convencoesMock.filter((c) => c.status === "em_aprovacao").length
  const totalExpiradas = convencoesMock.filter((c) => c.status === "expirada").length
  const totalPessoas = convencoesMock.reduce((acc, c) => acc + c.pessoas, 0)

  return (
    <div className="flex-1 overflow-auto bg-background">
      <RHNav />
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Convenções Coletivas</h1>
            <p className="text-muted-foreground">Motor de regras trabalhistas do sistema</p>
          </div>
          <Button onClick={() => setShowNewConvencao(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Nova Convenção
          </Button>
        </div>

        {/* Cards Resumo */}
        <div className="grid grid-cols-4 gap-4">
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/20">
                  <CheckCircle2 className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Ativas</p>
                  <p className="text-2xl font-bold text-foreground">{totalAtivas}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-yellow-500/20">
                  <Clock className="h-5 w-5 text-yellow-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Em Aprovação</p>
                  <p className="text-2xl font-bold text-foreground">{totalEmAprovacao}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-zinc-500/20">
                  <History className="h-5 w-5 text-zinc-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Expiradas</p>
                  <p className="text-2xl font-bold text-foreground">{totalExpiradas}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/20">
                  <Briefcase className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pessoas Cobertas</p>
                  <p className="text-2xl font-bold text-foreground">{totalPessoas.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros */}
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome, sindicato ou código..."
                  className="pl-10 bg-background"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48 bg-background">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os Status</SelectItem>
                  <SelectItem value="ativa">Ativas</SelectItem>
                  <SelectItem value="em_aprovacao">Em Aprovação</SelectItem>
                  <SelectItem value="expirada">Expiradas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Tabela Principal */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Convenções Cadastradas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-muted-foreground">Código</TableHead>
                  <TableHead className="text-muted-foreground">Nome da Convenção</TableHead>
                  <TableHead className="text-muted-foreground">Sindicato</TableHead>
                  <TableHead className="text-muted-foreground">UF/Cidade</TableHead>
                  <TableHead className="text-muted-foreground">Aplicação</TableHead>
                  <TableHead className="text-muted-foreground">Vigência</TableHead>
                  <TableHead className="text-muted-foreground">Versão</TableHead>
                  <TableHead className="text-muted-foreground">Status</TableHead>
                  <TableHead className="text-muted-foreground text-right">Ação</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredConvencoes.map((conv) => (
                  <TableRow key={conv.id} className="border-border">
                    <TableCell className="font-mono text-sm">{conv.id}</TableCell>
                    <TableCell className="font-medium">{conv.nome}</TableCell>
                    <TableCell className="text-muted-foreground">{conv.sindicato}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {conv.estado} - {conv.cidade}
                      </div>
                    </TableCell>
                    <TableCell>{getTipoAplicacaoBadge(conv.tipoAplicacao)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        {new Date(conv.vigenciaInicial).toLocaleDateString("pt-BR")} -{" "}
                        {new Date(conv.vigenciaFinal).toLocaleDateString("pt-BR")}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-mono">
                        v{conv.versao}
                      </Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(conv.status)}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedConvencao(conv)
                          setActiveTab("dados")
                        }}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Ver Detalhes
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Alerta de Governança */}
        <Card className="bg-yellow-500/10 border-yellow-500/30">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-yellow-400 mt-0.5" />
              <div>
                <p className="font-medium text-yellow-400">Governança de Convenções</p>
                <p className="text-sm text-yellow-400/80 mt-1">
                  Alterações em convenções geram nova versão e exigem aprovação hierárquica. Versões ativas não podem
                  ser editadas diretamente. Regras não são aplicadas automaticamente sem aprovação.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sheet - Detalhes da Convenção */}
      <Sheet open={!!selectedConvencao} onOpenChange={() => setSelectedConvencao(null)}>
        <SheetContent className="w-[800px] sm:max-w-[800px] overflow-y-auto">
          <SheetHeader>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => setSelectedConvencao(null)}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div>
                <SheetTitle>{selectedConvencao?.nome}</SheetTitle>
                <p className="text-sm text-muted-foreground">
                  {selectedConvencao?.id} - Versão {selectedConvencao?.versao}
                </p>
              </div>
            </div>
          </SheetHeader>

          <div className="mt-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-7 w-full">
                <TabsTrigger value="dados" className="text-xs">
                  Dados
                </TabsTrigger>
                <TabsTrigger value="jornada" className="text-xs">
                  Jornada
                </TabsTrigger>
                <TabsTrigger value="extras" className="text-xs">
                  H. Extras
                </TabsTrigger>
                <TabsTrigger value="beneficios" className="text-xs">
                  Benefícios
                </TabsTrigger>
                <TabsTrigger value="regras" className="text-xs">
                  Regras
                </TabsTrigger>
                <TabsTrigger value="historico" className="text-xs">
                  Histórico
                </TabsTrigger>
                <TabsTrigger value="aprovacoes" className="text-xs">
                  Aprovações
                </TabsTrigger>
              </TabsList>

              {/* Tab - Dados Gerais */}
              <TabsContent value="dados" className="mt-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Código</Label>
                    <Input value={selectedConvencao?.id || ""} disabled className="bg-muted" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Versão</Label>
                    <Input value={selectedConvencao?.versao || ""} disabled className="bg-muted" />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label className="text-muted-foreground">Nome da Convenção</Label>
                    <Input value={selectedConvencao?.nome || ""} disabled className="bg-muted" />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label className="text-muted-foreground">Sindicato</Label>
                    <Input value={selectedConvencao?.sindicato || ""} disabled className="bg-muted" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Estado</Label>
                    <Input value={selectedConvencao?.estado || ""} disabled className="bg-muted" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Cidade</Label>
                    <Input value={selectedConvencao?.cidade || ""} disabled className="bg-muted" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Vigência Inicial</Label>
                    <Input
                      value={
                        selectedConvencao ? new Date(selectedConvencao.vigenciaInicial).toLocaleDateString("pt-BR") : ""
                      }
                      disabled
                      className="bg-muted"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Vigência Final</Label>
                    <Input
                      value={
                        selectedConvencao ? new Date(selectedConvencao.vigenciaFinal).toLocaleDateString("pt-BR") : ""
                      }
                      disabled
                      className="bg-muted"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Tipo de Aplicação</Label>
                    <Input value={selectedConvencao?.tipoAplicacao || ""} disabled className="bg-muted" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Status</Label>
                    <div className="pt-2">{selectedConvencao && getStatusBadge(selectedConvencao.status)}</div>
                  </div>
                </div>

                {selectedConvencao?.status === "ativa" && (
                  <Card className="bg-blue-500/10 border-blue-500/30">
                    <CardContent className="p-3">
                      <div className="flex items-center gap-2 text-blue-400">
                        <Lock className="h-4 w-4" />
                        <span className="text-sm">
                          Versão ativa - edição bloqueada. Para alterar, crie uma nova versão.
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="flex gap-2 pt-4">
                  <Button variant="outline" disabled={selectedConvencao?.status === "ativa"}>
                    <Unlock className="h-4 w-4 mr-2" />
                    Editar
                  </Button>
                  <Button variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Nova Versão
                  </Button>
                </div>
              </TabsContent>

              {/* Tab - Jornada & Ponto */}
              <TabsContent value="jornada" className="mt-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Card className="bg-card border-border">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Timer className="h-4 w-4" />
                        Jornada de Trabalho
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Horas Diárias</span>
                        <span className="font-medium">{jornadaMock.horasDiarias}h</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Horas Semanais</span>
                        <span className="font-medium">{jornadaMock.horasSemanais}h</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Dias Trabalhados</span>
                        <span className="font-medium">{jornadaMock.diasSemana.join(", ")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Intervalo Mínimo</span>
                        <span className="font-medium">{jornadaMock.intervaloMinimo} min</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-card border-border">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Tolerâncias
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Tolerância Entrada</span>
                        <span className="font-medium">{jornadaMock.toleranciaEntrada} min</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Tolerância Saída</span>
                        <span className="font-medium">{jornadaMock.toleranciaSaida} min</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-card border-border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      Configurações Adicionais
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Banco de Horas</p>
                        <p className="text-sm text-muted-foreground">Permitir compensação via banco de horas</p>
                      </div>
                      <Switch checked={jornadaMock.bancoHorasPermitido} disabled />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Compensação Sábado</p>
                        <p className="text-sm text-muted-foreground">Permitir compensação de horas no sábado</p>
                      </div>
                      <Switch checked={jornadaMock.compensacaoSabado} disabled />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Jornada Flexível</p>
                        <p className="text-sm text-muted-foreground">Permitir horário flexível de entrada/saída</p>
                      </div>
                      <Switch checked={jornadaMock.jornadaFlexivel} disabled />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Tab - Horas Extras */}
              <TabsContent value="extras" className="mt-4 space-y-4">
                <Card className="bg-card border-border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Percent className="h-4 w-4" />
                      Percentuais de Horas Extras
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow className="border-border hover:bg-transparent">
                          <TableHead className="text-muted-foreground">Tipo</TableHead>
                          <TableHead className="text-muted-foreground text-center">Percentual</TableHead>
                          <TableHead className="text-muted-foreground text-center">Limite Diário</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {horasExtrasMock.map((he, idx) => (
                          <TableRow key={idx} className="border-border">
                            <TableCell className="font-medium">{he.tipo}</TableCell>
                            <TableCell className="text-center">
                              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                                +{he.percentual}%
                              </Badge>
                            </TableCell>
                            <TableCell className="text-center text-muted-foreground">
                              {he.limite ? `${he.limite}h` : "Sem limite"}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Tab - Benefícios Obrigatórios */}
              <TabsContent value="beneficios" className="mt-4 space-y-4">
                <Card className="bg-card border-border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Gift className="h-4 w-4" />
                      Benefícios da Convenção
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow className="border-border hover:bg-transparent">
                          <TableHead className="text-muted-foreground">Benefício</TableHead>
                          <TableHead className="text-muted-foreground text-center">Obrigatório</TableHead>
                          <TableHead className="text-muted-foreground text-right">Valor</TableHead>
                          <TableHead className="text-muted-foreground">Tipo</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {beneficiosMock.map((ben, idx) => (
                          <TableRow key={idx} className="border-border">
                            <TableCell className="font-medium">{ben.nome}</TableCell>
                            <TableCell className="text-center">
                              {ben.obrigatorio ? (
                                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Sim</Badge>
                              ) : (
                                <Badge variant="outline" className="text-muted-foreground">
                                  Não
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell className="text-right font-mono">
                              {ben.valor ? `R$ ${ben.valor.toFixed(2)}` : "-"}
                            </TableCell>
                            <TableCell className="text-muted-foreground">{ben.tipo}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Tab - Regras Operacionais */}
              <TabsContent value="regras" className="mt-4 space-y-4">
                <Card className="bg-card border-border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      Regras Operacionais
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow className="border-border hover:bg-transparent">
                          <TableHead className="text-muted-foreground">Regra</TableHead>
                          <TableHead className="text-muted-foreground">Valor/Percentual</TableHead>
                          <TableHead className="text-muted-foreground">Aplicação</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {regrasOperacionaisMock.map((regra, idx) => (
                          <TableRow key={idx} className="border-border">
                            <TableCell className="font-medium">{regra.regra}</TableCell>
                            <TableCell className="font-mono text-sm">{regra.valor}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{regra.aplicacao}</Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Tab - Histórico de Versões */}
              <TabsContent value="historico" className="mt-4 space-y-4">
                <Card className="bg-card border-border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <History className="h-4 w-4" />
                      Histórico de Versões
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow className="border-border hover:bg-transparent">
                          <TableHead className="text-muted-foreground">Versão</TableHead>
                          <TableHead className="text-muted-foreground">Data</TableHead>
                          <TableHead className="text-muted-foreground">Autor</TableHead>
                          <TableHead className="text-muted-foreground">Alterações</TableHead>
                          <TableHead className="text-muted-foreground">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {historicoVersoesMock.map((ver, idx) => (
                          <TableRow key={idx} className="border-border">
                            <TableCell>
                              <Badge variant="outline" className="font-mono">
                                v{ver.versao}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                              {new Date(ver.data).toLocaleDateString("pt-BR")}
                            </TableCell>
                            <TableCell>{ver.autor}</TableCell>
                            <TableCell className="text-muted-foreground">{ver.alteracoes}</TableCell>
                            <TableCell>
                              {ver.status === "ativa" ? (
                                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Ativa</Badge>
                              ) : (
                                <Badge variant="outline" className="text-muted-foreground">
                                  Substituída
                                </Badge>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Tab - Aprovações */}
              <TabsContent value="aprovacoes" className="mt-4 space-y-4">
                <Card className="bg-card border-border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Fluxo de Aprovação
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {aprovacoesPendentesMock.map((aprov, idx) => (
                        <div key={idx} className="flex items-start gap-4 p-3 rounded-lg bg-muted/30">
                          <div className="pt-1">{getAprovacaoStatusIcon(aprov.status)}</div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">{aprov.etapa}</p>
                                <p className="text-sm text-muted-foreground">{aprov.responsavel}</p>
                              </div>
                              <div className="text-right">
                                {aprov.status === "aprovado" && (
                                  <>
                                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                                      Aprovado
                                    </Badge>
                                    <p className="text-xs text-muted-foreground mt-1">
                                      {aprov.data && new Date(aprov.data).toLocaleDateString("pt-BR")}
                                    </p>
                                  </>
                                )}
                                {aprov.status === "pendente" && (
                                  <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                                    Pendente
                                  </Badge>
                                )}
                                {aprov.status === "aguardando" && (
                                  <Badge variant="outline" className="text-muted-foreground">
                                    Aguardando
                                  </Badge>
                                )}
                              </div>
                            </div>
                            {aprov.parecer && (
                              <p className="text-sm text-muted-foreground mt-2 italic">"{aprov.parecer}"</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {selectedConvencao?.status === "em_aprovacao" && (
                      <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                        <Button className="flex-1">
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          Aprovar
                        </Button>
                        <Button variant="outline" className="flex-1 bg-transparent">
                          <Send className="h-4 w-4 mr-2" />
                          Solicitar Revisão
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </SheetContent>
      </Sheet>

      {/* Sheet - Nova Convenção */}
      <Sheet open={showNewConvencao} onOpenChange={setShowNewConvencao}>
        <SheetContent className="w-[600px] sm:max-w-[600px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Nova Convenção Coletiva</SheetTitle>
          </SheetHeader>

          <div className="mt-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 col-span-2">
                <Label>Nome da Convenção</Label>
                <Input placeholder="Ex: Convenção Coletiva SP 2025" />
              </div>
              <div className="space-y-2 col-span-2">
                <Label>Sindicato</Label>
                <Input placeholder="Nome do sindicato" />
              </div>
              <div className="space-y-2">
                <Label>Estado</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SP">São Paulo</SelectItem>
                    <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                    <SelectItem value="MG">Minas Gerais</SelectItem>
                    <SelectItem value="BA">Bahia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Cidade</Label>
                <Input placeholder="Cidade de aplicação" />
              </div>
              <div className="space-y-2">
                <Label>Tipo de Aplicação</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Empresa">Empresa</SelectItem>
                    <SelectItem value="Obra">Obra</SelectItem>
                    <SelectItem value="Prestadora">Prestadora</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Código</Label>
                <Input placeholder="Ex: CC-SP-2025" />
              </div>
              <div className="space-y-2">
                <Label>Vigência Inicial</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <Label>Vigência Final</Label>
                <Input type="date" />
              </div>
            </div>

            <Card className="bg-yellow-500/10 border-yellow-500/30">
              <CardContent className="p-3">
                <div className="flex items-start gap-2 text-yellow-400">
                  <AlertTriangle className="h-4 w-4 mt-0.5" />
                  <span className="text-sm">
                    Após salvar, a convenção entrará em fluxo de aprovação. Configure as regras detalhadas após
                    aprovação inicial.
                  </span>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-2 pt-4">
              <Button className="flex-1">
                <Plus className="h-4 w-4 mr-2" />
                Criar e Enviar para Aprovação
              </Button>
              <Button variant="outline" onClick={() => setShowNewConvencao(false)}>
                Cancelar
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default function ConvencoesPage() {
  return (
    <Suspense fallback={null}>
      <ConvencoesContent />
    </Suspense>
  )
}
