"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  FileText,
  Search,
  Plus,
  MoreHorizontal,
  Building2,
  Calendar,
  DollarSign,
  TrendingUp,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Filter,
  Download,
  Target,
  Briefcase,
  Phone,
  Mail,
  MapPin,
  LayoutDashboard,
  FolderKanban,
  PieChart,
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

// Estagios do funil de vendas
const estagiosFunil = [
  { id: "prospeccao", nome: "Prospecção", cor: "bg-slate-500", total: 12, valor: 2450 },
  { id: "qualificacao", nome: "Qualificação", cor: "bg-blue-500", total: 8, valor: 1850 },
  { id: "proposta", nome: "Proposta Enviada", cor: "bg-amber-500", total: 5, valor: 980 },
  { id: "negociacao", nome: "Negociação", cor: "bg-purple-500", total: 3, valor: 720 },
  { id: "fechamento", nome: "Fechamento", cor: "bg-emerald-500", total: 2, valor: 450 },
]

// Mock data - Propostas
const propostasMock = [
  {
    id: "PROP-2026-001",
    titulo: "BR-116 Duplicação Trecho Sul",
    cliente: "DNIT",
    clienteContato: "Carlos Mendes",
    clienteEmail: "carlos.mendes@dnit.gov.br",
    clienteTelefone: "(61) 3315-4000",
    valor: 450000000,
    probabilidade: 75,
    estagio: "negociacao",
    dataAbertura: "2025-11-15",
    dataLimite: "2026-02-28",
    responsavel: "João Silva",
    responsavelAvatar: "JS",
    origem: "Licitação",
    tipo: "Infraestrutura Rodoviária",
    uf: "RS/SC",
    prazoExecucao: "36 meses",
    observacoes: "Proposta técnica aprovada. Aguardando análise de preços.",
    historico: [
      { data: "2026-01-08", acao: "Reunião com cliente", usuario: "João Silva" },
      { data: "2026-01-05", acao: "Proposta técnica enviada", usuario: "Maria Santos" },
      { data: "2025-12-20", acao: "Visita técnica realizada", usuario: "Carlos Lima" },
      { data: "2025-11-15", acao: "Proposta criada", usuario: "João Silva" },
    ],
  },
  {
    id: "PROP-2026-002",
    titulo: "SES Expansão Zona Leste",
    cliente: "SABESP",
    clienteContato: "Ana Paula Costa",
    clienteEmail: "ana.costa@sabesp.com.br",
    clienteTelefone: "(11) 3388-8000",
    valor: 280000000,
    probabilidade: 60,
    estagio: "proposta",
    dataAbertura: "2025-12-01",
    dataLimite: "2026-03-15",
    responsavel: "Maria Santos",
    responsavelAvatar: "MS",
    origem: "Convite",
    tipo: "Saneamento",
    uf: "SP",
    prazoExecucao: "24 meses",
    observacoes: "Aguardando retorno do cliente sobre especificações técnicas.",
    historico: [
      { data: "2026-01-07", acao: "Proposta comercial enviada", usuario: "Maria Santos" },
      { data: "2026-01-02", acao: "Orçamento finalizado", usuario: "Pedro Alves" },
      { data: "2025-12-15", acao: "Edital analisado", usuario: "Maria Santos" },
    ],
  },
  {
    id: "PROP-2026-003",
    titulo: "UHE Rio Verde - Obras Civis",
    cliente: "Eletrobras Furnas",
    clienteContato: "Roberto Fernandes",
    clienteEmail: "roberto.fernandes@furnas.com.br",
    clienteTelefone: "(21) 2528-5000",
    valor: 890000000,
    probabilidade: 40,
    estagio: "qualificacao",
    dataAbertura: "2025-12-10",
    dataLimite: "2026-04-30",
    responsavel: "Carlos Lima",
    responsavelAvatar: "CL",
    origem: "Licitação",
    tipo: "Energia",
    uf: "GO",
    prazoExecucao: "48 meses",
    observacoes: "Necessário consórcio. Buscando parceiros.",
    historico: [
      { data: "2026-01-06", acao: "Contato com possíveis parceiros", usuario: "Carlos Lima" },
      { data: "2025-12-20", acao: "Análise de viabilidade", usuario: "Equipe Técnica" },
    ],
  },
  {
    id: "PROP-2026-004",
    titulo: "Restauração SP-330 Trecho Norte",
    cliente: "CCR Rodovias",
    clienteContato: "Fernanda Oliveira",
    clienteEmail: "fernanda.oliveira@ccr.com.br",
    clienteTelefone: "(11) 3048-5000",
    valor: 95000000,
    probabilidade: 85,
    estagio: "fechamento",
    dataAbertura: "2025-10-20",
    dataLimite: "2026-01-31",
    responsavel: "João Silva",
    responsavelAvatar: "JS",
    origem: "Relacionamento",
    tipo: "Manutenção Rodoviária",
    uf: "SP",
    prazoExecucao: "12 meses",
    observacoes: "Contrato em fase de assinatura.",
    historico: [
      { data: "2026-01-09", acao: "Contrato em revisão jurídica", usuario: "Jurídico" },
      { data: "2026-01-05", acao: "Negociação de valores concluída", usuario: "João Silva" },
      { data: "2025-12-18", acao: "Proposta aceita", usuario: "CCR" },
    ],
  },
  {
    id: "PROP-2026-005",
    titulo: "Metro Linha 6 - Extensão",
    cliente: "Metrô SP",
    clienteContato: "Paulo Henrique",
    clienteEmail: "paulo.henrique@metro.sp.gov.br",
    clienteTelefone: "(11) 3283-5000",
    valor: 1200000000,
    probabilidade: 25,
    estagio: "prospeccao",
    dataAbertura: "2026-01-05",
    dataLimite: "2026-06-30",
    responsavel: "Maria Santos",
    responsavelAvatar: "MS",
    origem: "Licitação",
    tipo: "Transporte Metroviário",
    uf: "SP",
    prazoExecucao: "60 meses",
    observacoes: "Edital previsto para março. Acompanhando publicação.",
    historico: [{ data: "2026-01-05", acao: "Proposta registrada", usuario: "Maria Santos" }],
  },
  {
    id: "PROP-2026-006",
    titulo: "Terminal Portuário Santos",
    cliente: "Santos Port Authority",
    clienteContato: "Marcelo Dias",
    clienteEmail: "marcelo.dias@portodesantos.com.br",
    clienteTelefone: "(13) 3202-6565",
    valor: 380000000,
    probabilidade: 55,
    estagio: "proposta",
    dataAbertura: "2025-11-25",
    dataLimite: "2026-02-15",
    responsavel: "Carlos Lima",
    responsavelAvatar: "CL",
    origem: "Convite",
    tipo: "Portuário",
    uf: "SP",
    prazoExecucao: "30 meses",
    observacoes: "Proposta técnica e comercial enviadas. Aguardando análise.",
    historico: [
      { data: "2026-01-04", acao: "Proposta comercial enviada", usuario: "Carlos Lima" },
      { data: "2025-12-28", acao: "Proposta técnica enviada", usuario: "Equipe Técnica" },
    ],
  },
  {
    id: "PROP-2026-007",
    titulo: "Ponte Rio-Niterói - Manutenção",
    cliente: "CCR Ponte",
    clienteContato: "Ricardo Souza",
    clienteEmail: "ricardo.souza@ccrponte.com.br",
    clienteTelefone: "(21) 2620-7070",
    valor: 45000000,
    probabilidade: 90,
    estagio: "fechamento",
    dataAbertura: "2025-09-15",
    dataLimite: "2026-01-20",
    responsavel: "João Silva",
    responsavelAvatar: "JS",
    origem: "Relacionamento",
    tipo: "Manutenção Estrutural",
    uf: "RJ",
    prazoExecucao: "8 meses",
    observacoes: "Assinatura prevista para próxima semana.",
    historico: [
      { data: "2026-01-08", acao: "Reunião de alinhamento final", usuario: "João Silva" },
      { data: "2026-01-03", acao: "Última revisão contratual", usuario: "Jurídico" },
    ],
  },
]

// Propostas ganhas e perdidas (historico)
const propostasHistorico = [
  {
    id: "PROP-2025-089",
    titulo: "BR-101 Lote 3",
    cliente: "DNIT",
    valor: 450000000,
    status: "ganha",
    data: "2025-08-15",
  },
  {
    id: "PROP-2025-076",
    titulo: "SES Metro Sul",
    cliente: "SABESP",
    valor: 180000000,
    status: "ganha",
    data: "2025-07-20",
  },
  {
    id: "PROP-2025-045",
    titulo: "Aeroporto Regional",
    cliente: "Infraero",
    valor: 120000000,
    status: "perdida",
    data: "2025-06-10",
  },
  {
    id: "PROP-2025-023",
    titulo: "UHE Belo Monte Comp",
    cliente: "Furnas",
    valor: 890000000,
    status: "ganha",
    data: "2025-05-08",
  },
]

export default function PropostasPage() {
  const pathname = usePathname()
  const [searchTerm, setSearchTerm] = useState("")
  const [estagioFiltro, setEstagioFiltro] = useState<string | null>(null)
  const [propostaSelecionada, setPropostaSelecionada] = useState<(typeof propostasMock)[0] | null>(null)
  const [showNovaPropostaDialog, setShowNovaPropostaDialog] = useState(false)

  // Filtra propostas
  const propostasFiltradas = propostasMock.filter((p) => {
    const matchSearch =
      p.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchEstagio = estagioFiltro ? p.estagio === estagioFiltro : true
    return matchSearch && matchEstagio
  })

  // Calcula totais
  const valorTotalPipeline = propostasMock.reduce((acc, p) => acc + p.valor, 0)
  const valorPonderado = propostasMock.reduce((acc, p) => acc + (p.valor * p.probabilidade) / 100, 0)

  const formatCurrency = (value: number) => {
    if (value >= 1000000000) return `R$ ${(value / 1000000000).toFixed(1)} Bi`
    if (value >= 1000000) return `R$ ${(value / 1000000).toFixed(0)} Mi`
    return `R$ ${value.toLocaleString("pt-BR")}`
  }

  const getEstagioColor = (estagio: string) => {
    const colors: Record<string, string> = {
      prospeccao: "bg-slate-500",
      qualificacao: "bg-blue-500",
      proposta: "bg-amber-500",
      negociacao: "bg-purple-500",
      fechamento: "bg-emerald-500",
    }
    return colors[estagio] || "bg-gray-500"
  }

  const getEstagioLabel = (estagio: string) => {
    const labels: Record<string, string> = {
      prospeccao: "Prospecção",
      qualificacao: "Qualificação",
      proposta: "Proposta Enviada",
      negociacao: "Negociação",
      fechamento: "Fechamento",
    }
    return labels[estagio] || estagio
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
                placeholder="Buscar propostas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64 pl-7 h-8 text-xs"
              />
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <Button variant="outline" size="sm" className="h-7 text-xs gap-1.5 bg-transparent">
              <Filter className="w-3.5 h-3.5" />
              Filtros
            </Button>
            <Button variant="outline" size="sm" className="h-7 text-xs gap-1.5 bg-transparent">
              <Download className="w-3.5 h-3.5" />
              Exportar
            </Button>
            <Dialog open={showNovaPropostaDialog} onOpenChange={setShowNovaPropostaDialog}>
              <DialogTrigger asChild>
                <Button size="sm" className="h-7 text-xs gap-1.5">
                  <Plus className="w-3.5 h-3.5" />
                  Nova Proposta
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Nova Proposta</DialogTitle>
                  <DialogDescription>
                    Registre uma nova oportunidade de negócio no pipeline comercial.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="titulo">Título da Proposta</Label>
                      <Input id="titulo" placeholder="Ex: BR-116 Duplicação Trecho Sul" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cliente">Cliente</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o cliente" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dnit">DNIT</SelectItem>
                          <SelectItem value="sabesp">SABESP</SelectItem>
                          <SelectItem value="furnas">Eletrobras Furnas</SelectItem>
                          <SelectItem value="ccr">CCR Rodovias</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="valor">Valor Estimado</Label>
                      <Input id="valor" placeholder="R$ 0,00" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="origem">Origem</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="licitacao">Licitação</SelectItem>
                          <SelectItem value="convite">Convite</SelectItem>
                          <SelectItem value="relacionamento">Relacionamento</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tipo">Tipo de Obra</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="rodovia">Infraestrutura Rodoviária</SelectItem>
                          <SelectItem value="saneamento">Saneamento</SelectItem>
                          <SelectItem value="energia">Energia</SelectItem>
                          <SelectItem value="portuario">Portuário</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dataLimite">Data Limite</Label>
                      <Input id="dataLimite" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="responsavel">Responsável</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="joao">João Silva</SelectItem>
                          <SelectItem value="maria">Maria Santos</SelectItem>
                          <SelectItem value="carlos">Carlos Lima</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="observacoes">Observações</Label>
                    <Textarea id="observacoes" placeholder="Informações adicionais sobre a proposta..." />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowNovaPropostaDialog(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={() => setShowNovaPropostaDialog(false)}>Criar Proposta</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </header>

        {/* Conteudo */}
        <main className="flex-1 overflow-auto p-4">
          <div className="max-w-[1600px] mx-auto space-y-4">
            {/* Metricas do Pipeline */}
            <div className="grid grid-cols-5 gap-3">
              <Card className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{propostasMock.length}</p>
                    <p className="text-[10px] text-muted-foreground">Propostas Ativas</p>
                  </div>
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
              </Card>
              <Card className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{formatCurrency(valorTotalPipeline)}</p>
                    <p className="text-[10px] text-muted-foreground">Pipeline Total</p>
                  </div>
                  <DollarSign className="w-5 h-5 text-emerald-600" />
                </div>
              </Card>
              <Card className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{formatCurrency(valorPonderado)}</p>
                    <p className="text-[10px] text-muted-foreground">Valor Ponderado</p>
                  </div>
                  <Target className="w-5 h-5 text-purple-600" />
                </div>
              </Card>
              <Card className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">
                      {propostasMock.filter((p) => p.estagio === "fechamento").length}
                    </p>
                    <p className="text-[10px] text-muted-foreground">Em Fechamento</p>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                </div>
              </Card>
              <Card className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">68%</p>
                    <p className="text-[10px] text-muted-foreground">Taxa Conversão</p>
                  </div>
                  <TrendingUp className="w-5 h-5 text-amber-600" />
                </div>
              </Card>
            </div>

            {/* Funil de Vendas Visual */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium">Funil de Vendas</h3>
                <div className="flex gap-1">
                  {estagiosFunil.map((estagio) => (
                    <Button
                      key={estagio.id}
                      variant={estagioFiltro === estagio.id ? "default" : "ghost"}
                      size="sm"
                      className="h-6 text-[10px] px-2"
                      onClick={() => setEstagioFiltro(estagioFiltro === estagio.id ? null : estagio.id)}
                    >
                      {estagio.nome}
                    </Button>
                  ))}
                  {estagioFiltro && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 text-[10px] px-2 text-muted-foreground"
                      onClick={() => setEstagioFiltro(null)}
                    >
                      Limpar
                    </Button>
                  )}
                </div>
              </div>
              <div className="flex gap-2 h-24">
                {estagiosFunil.map((estagio, index) => {
                  const propostasEstagio = propostasMock.filter((p) => p.estagio === estagio.id)
                  const valorEstagio = propostasEstagio.reduce((acc, p) => acc + p.valor, 0)
                  const widthPercent = 100 - index * 15
                  return (
                    <div
                      key={estagio.id}
                      className="flex-1 relative group cursor-pointer"
                      onClick={() => setEstagioFiltro(estagio.id)}
                    >
                      <div
                        className={cn(
                          "h-full rounded-lg transition-all",
                          estagio.cor,
                          estagioFiltro === estagio.id ? "ring-2 ring-primary ring-offset-2" : "hover:opacity-90",
                        )}
                        style={{
                          clipPath: `polygon(0 ${index * 8}%, 100% ${index * 8}%, 100% ${100 - index * 8}%, 0 ${100 - index * 8}%)`,
                        }}
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                        <span className="text-lg font-bold">{propostasEstagio.length}</span>
                        <span className="text-[10px] opacity-90">{formatCurrency(valorEstagio)}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="flex justify-between mt-2 px-1">
                {estagiosFunil.map((estagio) => (
                  <span key={estagio.id} className="text-[10px] text-muted-foreground text-center flex-1">
                    {estagio.nome}
                  </span>
                ))}
              </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Lista de Propostas */}
              <Card className="lg:col-span-2">
                <CardHeader className="py-3 px-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">
                      Propostas {estagioFiltro && `- ${getEstagioLabel(estagioFiltro)}`}
                    </CardTitle>
                    <span className="text-xs text-muted-foreground">{propostasFiltradas.length} proposta(s)</span>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-[400px]">
                    <div className="divide-y">
                      {propostasFiltradas.map((proposta) => (
                        <div
                          key={proposta.id}
                          className={cn(
                            "p-3 hover:bg-muted/50 cursor-pointer transition-colors",
                            propostaSelecionada?.id === proposta.id && "bg-muted/50",
                          )}
                          onClick={() => setPropostaSelecionada(proposta)}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-mono text-[10px] text-muted-foreground">{proposta.id}</span>
                                <Badge className={cn("text-[10px] text-white", getEstagioColor(proposta.estagio))}>
                                  {getEstagioLabel(proposta.estagio)}
                                </Badge>
                              </div>
                              <h4 className="font-medium text-sm truncate">{proposta.titulo}</h4>
                              <div className="flex items-center gap-3 mt-1 text-[10px] text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Building2 className="w-3 h-3" />
                                  {proposta.cliente}
                                </span>
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  {proposta.uf}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  Limite: {new Date(proposta.dataLimite).toLocaleDateString("pt-BR")}
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-sm text-primary">{formatCurrency(proposta.valor)}</p>
                              <div className="flex items-center gap-1 mt-1">
                                <Progress value={proposta.probabilidade} className="w-16 h-1.5" />
                                <span className="text-[10px] text-muted-foreground">{proposta.probabilidade}%</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Detalhes da Proposta Selecionada */}
              <Card>
                <CardHeader className="py-3 px-4">
                  <CardTitle className="text-sm font-medium">
                    {propostaSelecionada ? "Detalhes da Proposta" : "Selecione uma Proposta"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {propostaSelecionada ? (
                    <ScrollArea className="h-[400px]">
                      <div className="p-4 space-y-4">
                        {/* Info basica */}
                        <div>
                          <Badge
                            className={cn("text-[10px] text-white mb-2", getEstagioColor(propostaSelecionada.estagio))}
                          >
                            {getEstagioLabel(propostaSelecionada.estagio)}
                          </Badge>
                          <h3 className="font-semibold">{propostaSelecionada.titulo}</h3>
                          <p className="text-xs text-muted-foreground mt-1">
                            {propostaSelecionada.id} | {propostaSelecionada.tipo}
                          </p>
                        </div>

                        {/* Valor e probabilidade */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="p-2 bg-muted/50 rounded">
                            <p className="text-[10px] text-muted-foreground">Valor</p>
                            <p className="font-bold text-primary">{formatCurrency(propostaSelecionada.valor)}</p>
                          </div>
                          <div className="p-2 bg-muted/50 rounded">
                            <p className="text-[10px] text-muted-foreground">Probabilidade</p>
                            <p className="font-bold">{propostaSelecionada.probabilidade}%</p>
                          </div>
                        </div>

                        {/* Cliente */}
                        <div className="space-y-2">
                          <p className="text-xs font-medium">Cliente</p>
                          <div className="p-2 bg-muted/50 rounded space-y-1">
                            <p className="text-sm font-medium">{propostaSelecionada.cliente}</p>
                            <p className="text-xs text-muted-foreground">{propostaSelecionada.clienteContato}</p>
                            <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Mail className="w-3 h-3" />
                                {propostaSelecionada.clienteEmail}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                              <Phone className="w-3 h-3" />
                              {propostaSelecionada.clienteTelefone}
                            </div>
                          </div>
                        </div>

                        {/* Datas */}
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <p className="text-[10px] text-muted-foreground">Abertura</p>
                            <p className="text-xs">
                              {new Date(propostaSelecionada.dataAbertura).toLocaleDateString("pt-BR")}
                            </p>
                          </div>
                          <div>
                            <p className="text-[10px] text-muted-foreground">Data Limite</p>
                            <p className="text-xs font-medium text-amber-600">
                              {new Date(propostaSelecionada.dataLimite).toLocaleDateString("pt-BR")}
                            </p>
                          </div>
                        </div>

                        {/* Responsavel */}
                        <div className="flex items-center gap-2">
                          <Avatar className="w-6 h-6">
                            <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                              {propostaSelecionada.responsavelAvatar}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-xs font-medium">{propostaSelecionada.responsavel}</p>
                            <p className="text-[10px] text-muted-foreground">Responsável</p>
                          </div>
                        </div>

                        {/* Observacoes */}
                        <div>
                          <p className="text-xs font-medium mb-1">Observações</p>
                          <p className="text-xs text-muted-foreground">{propostaSelecionada.observacoes}</p>
                        </div>

                        {/* Historico */}
                        <div>
                          <p className="text-xs font-medium mb-2">Histórico</p>
                          <div className="space-y-2">
                            {propostaSelecionada.historico.map((item, index) => (
                              <div key={index} className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                                <div>
                                  <p className="text-xs">{item.acao}</p>
                                  <p className="text-[10px] text-muted-foreground">
                                    {item.data} - {item.usuario}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Acoes */}
                        <div className="flex gap-2 pt-2">
                          {propostaSelecionada.estagio === "fechamento" && (
                            <Button size="sm" className="flex-1 text-xs h-8">
                              <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                              Marcar como Ganha
                            </Button>
                          )}
                          {propostaSelecionada.estagio !== "fechamento" && (
                            <Button size="sm" className="flex-1 text-xs h-8">
                              <ArrowRight className="w-3.5 h-3.5 mr-1" />
                              Avançar Estágio
                            </Button>
                          )}
                          <Button variant="outline" size="sm" className="text-xs h-8 bg-transparent">
                            <MoreHorizontal className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </div>
                    </ScrollArea>
                  ) : (
                    <div className="h-[400px] flex flex-col items-center justify-center text-muted-foreground">
                      <FileText className="w-12 h-12 mb-3 opacity-30" />
                      <p className="text-sm">Selecione uma proposta</p>
                      <p className="text-xs">para ver os detalhes</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Historico de Propostas */}
            <Card>
              <CardHeader className="py-3 px-4">
                <CardTitle className="text-sm font-medium">Histórico Recente</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {propostasHistorico.map((proposta) => (
                    <div key={proposta.id} className="px-4 py-2 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {proposta.status === "ganha" ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-500" />
                        )}
                        <div>
                          <p className="text-sm font-medium">{proposta.titulo}</p>
                          <p className="text-[10px] text-muted-foreground">
                            {proposta.cliente} | {proposta.id}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{formatCurrency(proposta.valor)}</p>
                        <p className="text-[10px] text-muted-foreground">
                          {new Date(proposta.data).toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
