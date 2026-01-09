"use client"

import { useState } from "react"
import {
  Search,
  ChevronRight,
  Bot,
  Plus,
  Trash2,
  Play,
  Pause,
  Settings,
  MoreHorizontal,
  Zap,
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  Activity,
  BarChart3,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"

const agentesData = [
  {
    id: "ia-001",
    nome: "Assistente RH",
    descricao: "Responde duvidas sobre folha, ferias, beneficios",
    modelo: "GPT-4",
    status: "ativo",
    requisicoesMes: 1250,
    limiteRequisicoes: 5000,
    custoMes: 125.5,
    ultimaExecucao: "09/01/2026 14:32",
    departamento: "Recursos Humanos",
  },
  {
    id: "ia-002",
    nome: "Analista de Custos",
    descricao: "Analisa desvios e sugere acoes corretivas",
    modelo: "GPT-4",
    status: "ativo",
    requisicoesMes: 890,
    limiteRequisicoes: 3000,
    custoMes: 89.0,
    ultimaExecucao: "09/01/2026 13:45",
    departamento: "Financeiro",
  },
  {
    id: "ia-003",
    nome: "Assistente Comercial",
    descricao: "Auxilia na elaboracao de propostas",
    modelo: "GPT-3.5",
    status: "ativo",
    requisicoesMes: 450,
    limiteRequisicoes: 2000,
    custoMes: 22.5,
    ultimaExecucao: "09/01/2026 11:20",
    departamento: "Comercial",
  },
  {
    id: "ia-004",
    nome: "Classificador de NFe",
    descricao: "Classifica notas fiscais automaticamente",
    modelo: "GPT-3.5",
    status: "pausado",
    requisicoesMes: 0,
    limiteRequisicoes: 10000,
    custoMes: 0,
    ultimaExecucao: "05/01/2026 09:00",
    departamento: "Fiscal",
  },
  {
    id: "ia-005",
    nome: "Suporte Tecnico",
    descricao: "Primeira linha de atendimento ao usuario",
    modelo: "GPT-4",
    status: "ativo",
    requisicoesMes: 2100,
    limiteRequisicoes: 5000,
    custoMes: 210.0,
    ultimaExecucao: "09/01/2026 14:50",
    departamento: "TI",
  },
]

export default function IAsPage() {
  const [filtroStatus, setFiltroStatus] = useState("todos")
  const [busca, setBusca] = useState("")

  const agentesFiltrados = agentesData.filter((agente) => {
    if (filtroStatus !== "todos" && agente.status !== filtroStatus) return false
    if (busca && !agente.nome.toLowerCase().includes(busca.toLowerCase())) return false
    return true
  })

  const totalAtivos = agentesData.filter((a) => a.status === "ativo").length
  const totalRequisicoes = agentesData.reduce((acc, a) => acc + a.requisicoesMes, 0)
  const custoTotal = agentesData.reduce((acc, a) => acc + a.custoMes, 0)

  const atividadeRecente = [
    {
      acao: "Requisicao processada",
      detalhe: "Assistente RH - Duvida sobre ferias",
      tempo: "2 min",
      status: "sucesso",
    },
    { acao: "Requisicao processada", detalhe: "Suporte Tecnico - Reset de senha", tempo: "5 min", status: "sucesso" },
    { acao: "Limite atingido", detalhe: "Classificador NFe - 100% do limite", tempo: "4d", status: "alerta" },
    { acao: "Agente pausado", detalhe: "Classificador NFe", tempo: "4d", status: "info" },
  ]

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-background">
      {/* Header */}
      <div className="h-14 border-b flex items-center justify-between px-4 bg-card">
        <div className="flex items-center gap-3">
          <Bot className="h-5 w-5 text-primary" />
          <div>
            <h1 className="font-semibold text-sm">IAs & Agentes</h1>
            <p className="text-xs text-muted-foreground">Gerenciamento de assistentes de IA</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar agente..."
              className="pl-8 h-8 text-sm"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Novo Agente
          </Button>
        </div>
      </div>

      {/* Metricas */}
      <div className="grid grid-cols-6 gap-3 p-4 border-b bg-muted/30">
        <div className="bg-card rounded-lg border p-3">
          <div className="text-2xl font-bold">{agentesData.length}</div>
          <div className="text-xs text-muted-foreground">Total de Agentes</div>
        </div>
        <div className="bg-card rounded-lg border p-3">
          <div className="text-2xl font-bold text-emerald-600">{totalAtivos}</div>
          <div className="text-xs text-muted-foreground">Ativos</div>
        </div>
        <div className="bg-card rounded-lg border p-3">
          <div className="text-2xl font-bold text-blue-600">{totalRequisicoes.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground">Requisicoes (Mes)</div>
        </div>
        <div className="bg-card rounded-lg border p-3">
          <div className="text-2xl font-bold text-amber-600">R$ {custoTotal.toFixed(2)}</div>
          <div className="text-xs text-muted-foreground">Custo Total (Mes)</div>
        </div>
        <div className="bg-card rounded-lg border p-3">
          <div className="text-2xl font-bold">98.5%</div>
          <div className="text-xs text-muted-foreground">Taxa de Sucesso</div>
        </div>
        <div className="bg-card rounded-lg border p-3">
          <div className="text-2xl font-bold">1.2s</div>
          <div className="text-xs text-muted-foreground">Tempo Medio</div>
        </div>
      </div>

      {/* Conteudo principal */}
      <div className="flex-1 flex overflow-hidden">
        {/* Tabela */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="p-3 border-b flex items-center gap-3">
            <Select value={filtroStatus} onValueChange={setFiltroStatus}>
              <SelectTrigger className="w-40 h-8">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="ativo">Ativos</SelectItem>
                <SelectItem value="pausado">Pausados</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1 overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12"></TableHead>
                  <TableHead>Agente</TableHead>
                  <TableHead>Modelo</TableHead>
                  <TableHead>Departamento</TableHead>
                  <TableHead>Requisicoes</TableHead>
                  <TableHead>Custo</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {agentesFiltrados.map((agente) => (
                  <TableRow key={agente.id}>
                    <TableCell>
                      <div
                        className={`h-8 w-8 rounded-full flex items-center justify-center ${agente.status === "ativo" ? "bg-emerald-100" : "bg-gray-100"}`}
                      >
                        <Bot
                          className={`h-4 w-4 ${agente.status === "ativo" ? "text-emerald-600" : "text-gray-400"}`}
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-sm">{agente.nome}</div>
                      <div className="text-xs text-muted-foreground">{agente.descricao}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{agente.modelo}</Badge>
                    </TableCell>
                    <TableCell className="text-sm">{agente.departamento}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm">
                          {agente.requisicoesMes.toLocaleString()} / {agente.limiteRequisicoes.toLocaleString()}
                        </div>
                        <Progress value={(agente.requisicoesMes / agente.limiteRequisicoes) * 100} className="h-1.5" />
                      </div>
                    </TableCell>
                    <TableCell className="text-sm font-medium">R$ {agente.custoMes.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge className={agente.status === "ativo" ? "bg-emerald-600" : "bg-gray-400"}>
                        {agente.status === "ativo" ? "Ativo" : "Pausado"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            {agente.status === "ativo" ? (
                              <Pause className="h-4 w-4 mr-2" />
                            ) : (
                              <Play className="h-4 w-4 mr-2" />
                            )}
                            {agente.status === "ativo" ? "Pausar" : "Ativar"}
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Settings className="h-4 w-4 mr-2" />
                            Configurar
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <BarChart3 className="h-4 w-4 mr-2" />
                            Metricas
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Sidebar Atividade */}
        <div className="w-72 border-l bg-card flex flex-col">
          <div className="p-3 border-b">
            <span className="text-sm font-medium">Atividade em Tempo Real</span>
          </div>
          <div className="flex-1 overflow-auto p-3 space-y-3">
            {atividadeRecente.map((item, index) => (
              <div key={index} className="text-sm">
                <div className="flex items-center gap-2">
                  {item.status === "sucesso" && <CheckCircle className="h-3 w-3 text-emerald-500" />}
                  {item.status === "alerta" && <AlertTriangle className="h-3 w-3 text-amber-500" />}
                  {item.status === "info" && <Activity className="h-3 w-3 text-blue-500" />}
                  <span className="font-medium">{item.acao}</span>
                </div>
                <div className="text-xs text-muted-foreground ml-5">{item.detalhe}</div>
                <div className="text-xs text-muted-foreground ml-5">{item.tempo}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cards de acao rapida */}
      <div className="border-t p-3 bg-card">
        <div className="grid grid-cols-4 gap-3">
          <button className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted text-left">
            <Plus className="h-5 w-5 text-muted-foreground" />
            <div>
              <div className="font-medium text-sm">Novo Agente</div>
              <div className="text-xs text-muted-foreground">Criar assistente IA</div>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground ml-auto" />
          </button>
          <button className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted text-left">
            <Zap className="h-5 w-5 text-muted-foreground" />
            <div>
              <div className="font-medium text-sm">Testar Agente</div>
              <div className="text-xs text-muted-foreground">Simulacao de conversa</div>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground ml-auto" />
          </button>
          <button className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted text-left">
            <BarChart3 className="h-5 w-5 text-muted-foreground" />
            <div>
              <div className="font-medium text-sm">Relatorios</div>
              <div className="text-xs text-muted-foreground">Metricas e custos</div>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground ml-auto" />
          </button>
          <button className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted text-left">
            <MessageSquare className="h-5 w-5 text-muted-foreground" />
            <div>
              <div className="font-medium text-sm">Logs de Conversa</div>
              <div className="text-xs text-muted-foreground">Historico completo</div>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground ml-auto" />
          </button>
        </div>
      </div>
    </div>
  )
}
