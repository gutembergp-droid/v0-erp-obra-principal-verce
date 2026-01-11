"use client"

import { useState } from "react"
import { ConsoleNavbar } from "../_components/console-navbar"
import {
  Search,
  Plug,
  Database,
  CreditCard,
  FileText,
  Users,
  Building2,
  Plus,
  RefreshCw,
  Settings,
  MoreHorizontal,
  CheckCircle,
  AlertTriangle,
  Clock,
  Activity,
  Zap,
  Eye,
  Trash2,
  Play,
  Pause,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"

const integracoesData = [
  {
    id: "int-001",
    nome: "ERP Legado",
    descricao: "Integracao com sistema ERP anterior",
    categoria: "ERP",
    icon: Database,
    status: "ativo",
    ultimaSync: "09/01/2026 14:30",
    registrosSyncMes: 15420,
    errosMes: 3,
    proximaSync: "09/01/2026 15:00",
    intervalo: "30 min",
  },
  {
    id: "int-002",
    nome: "Banco Itau",
    descricao: "Conciliacao bancaria automatica",
    categoria: "Bancario",
    icon: CreditCard,
    status: "ativo",
    ultimaSync: "09/01/2026 14:00",
    registrosSyncMes: 892,
    errosMes: 0,
    proximaSync: "09/01/2026 15:00",
    intervalo: "1 hora",
  },
  {
    id: "int-003",
    nome: "Banco Bradesco",
    descricao: "Conciliacao bancaria automatica",
    categoria: "Bancario",
    icon: CreditCard,
    status: "ativo",
    ultimaSync: "09/01/2026 14:00",
    registrosSyncMes: 645,
    errosMes: 0,
    proximaSync: "09/01/2026 15:00",
    intervalo: "1 hora",
  },
  {
    id: "int-004",
    nome: "eSocial",
    descricao: "Envio de eventos trabalhistas",
    categoria: "Governo",
    icon: Building2,
    status: "erro",
    ultimaSync: "08/01/2026 23:00",
    registrosSyncMes: 347,
    errosMes: 12,
    proximaSync: "Aguardando correcao",
    intervalo: "Diario",
  },
  {
    id: "int-005",
    nome: "NFe / NFSe",
    descricao: "Emissao e recepcao de notas fiscais",
    categoria: "Fiscal",
    icon: FileText,
    status: "ativo",
    ultimaSync: "09/01/2026 13:45",
    registrosSyncMes: 2340,
    errosMes: 5,
    proximaSync: "09/01/2026 14:45",
    intervalo: "1 hora",
  },
  {
    id: "int-006",
    nome: "Ponto Eletronico",
    descricao: "Importacao de marcacoes de ponto",
    categoria: "RH",
    icon: Users,
    status: "inativo",
    ultimaSync: "01/01/2026 00:00",
    registrosSyncMes: 0,
    errosMes: 0,
    proximaSync: "-",
    intervalo: "Diario",
  },
  {
    id: "int-007",
    nome: "SEFAZ",
    descricao: "Consulta de notas e manifestacao",
    categoria: "Fiscal",
    icon: FileText,
    status: "ativo",
    ultimaSync: "09/01/2026 14:15",
    registrosSyncMes: 1256,
    errosMes: 2,
    proximaSync: "09/01/2026 15:15",
    intervalo: "1 hora",
  },
]

export default function IntegracoesPage() {
  const [busca, setBusca] = useState("")
  const [filtroStatus, setFiltroStatus] = useState("todos")
  const [filtroCategoria, setFiltroCategoria] = useState("todos")
  const [showConfigDialog, setShowConfigDialog] = useState(false)
  const [integracaoSelecionada, setIntegracaoSelecionada] = useState<(typeof integracoesData)[0] | null>(null)
  const [showDetalhesDialog, setShowDetalhesDialog] = useState(false)

  const integracoesFiltradas = integracoesData.filter((int) => {
    if (filtroStatus !== "todos" && int.status !== filtroStatus) return false
    if (filtroCategoria !== "todos" && int.categoria !== filtroCategoria) return false
    if (busca && !int.nome.toLowerCase().includes(busca.toLowerCase())) return false
    return true
  })

  const ativas = integracoesData.filter((i) => i.status === "ativo").length
  const comErro = integracoesData.filter((i) => i.status === "erro").length
  const inativas = integracoesData.filter((i) => i.status === "inativo").length
  const totalSyncs = integracoesData.reduce((acc, i) => acc + i.registrosSyncMes, 0)
  const totalErros = integracoesData.reduce((acc, i) => acc + i.errosMes, 0)

  const categorias = [...new Set(integracoesData.map((i) => i.categoria))]

  const atividadeRecente = [
    { acao: "Sync concluido", detalhe: "ERP Legado - 234 registros", tempo: "30 min", tipo: "sucesso" },
    { acao: "Erro de conexao", detalhe: "eSocial - timeout", tempo: "2h", tipo: "erro" },
    { acao: "Sync concluido", detalhe: "Banco Itau - 45 lancamentos", tempo: "4h", tipo: "sucesso" },
    { acao: "Sync concluido", detalhe: "NFe - 89 notas processadas", tempo: "5h", tipo: "sucesso" },
    { acao: "Integracao desativada", detalhe: "Ponto Eletronico", tempo: "8d", tipo: "info" },
    { acao: "Nova integracao", detalhe: "SEFAZ configurada", tempo: "15d", tipo: "info" },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ativo":
        return <Badge className="bg-emerald-600">Ativo</Badge>
      case "erro":
        return <Badge className="bg-red-600">Erro</Badge>
      case "inativo":
        return <Badge variant="secondary">Inativo</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="flex flex-col h-screen bg-muted/30 overflow-hidden">
      <div className="flex-shrink-0 z-40 mt-0">
        <ConsoleNavbar />
      </div>
      <main className="flex-1 bg-background overflow-hidden p-6">
        <div 
          className="h-full border-0 bg-background overflow-y-auto overflow-x-hidden scrollbar-hide p-6" 
          style={{ 
            borderRadius: '25px', 
            boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.13), 0 2px 8px rgba(0, 0, 0, 0.05)',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
      {/* Header */}
      <div className="h-14 border-b flex items-center justify-between px-4 bg-card mb-4">
        <div className="flex items-center gap-3">
          <Plug className="h-5 w-5 text-primary" />
          <div>
            <h1 className="font-semibold text-sm">Integracoes</h1>
            <p className="text-xs text-muted-foreground">Conexoes com sistemas externos</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar integracao..."
              className="pl-8 h-8 text-sm"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-1" />
            Sync Todas
          </Button>
          <Button size="sm" onClick={() => setShowConfigDialog(true)}>
            <Plus className="h-4 w-4 mr-1" />
            Nova Integracao
          </Button>
        </div>
      </div>

      {/* Barra de alertas */}
      {comErro > 0 && (
        <div className="h-9 bg-red-50 border-b border-red-200 flex items-center px-4 text-sm">
          <AlertTriangle className="h-4 w-4 text-red-600 mr-2" />
          <span className="text-red-800">{comErro} integracao(oes) com erro - requer atencao</span>
          <Button variant="link" size="sm" className="text-red-700 ml-2 h-auto p-0">
            Ver detalhes
          </Button>
        </div>
      )}

      {/* Metricas */}
      <div className="grid grid-cols-6 gap-3 p-4 border-b bg-muted/30">
        <div className="bg-card rounded-lg border p-3">
          <div className="text-2xl font-bold">{integracoesData.length}</div>
          <div className="text-xs text-muted-foreground">Total Integracoes</div>
        </div>
        <div className="bg-card rounded-lg border p-3">
          <div className="text-2xl font-bold text-emerald-600">{ativas}</div>
          <div className="text-xs text-muted-foreground">Ativas</div>
        </div>
        <div className="bg-card rounded-lg border p-3">
          <div className="text-2xl font-bold text-red-600">{comErro}</div>
          <div className="text-xs text-muted-foreground">Com Erro</div>
        </div>
        <div className="bg-card rounded-lg border p-3">
          <div className="text-2xl font-bold text-muted-foreground">{inativas}</div>
          <div className="text-xs text-muted-foreground">Inativas</div>
        </div>
        <div className="bg-card rounded-lg border p-3">
          <div className="text-2xl font-bold text-blue-600">{totalSyncs.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground">Syncs (Mes)</div>
        </div>
        <div className="bg-card rounded-lg border p-3">
          <div className="text-2xl font-bold text-amber-600">{totalErros}</div>
          <div className="text-xs text-muted-foreground">Erros (Mes)</div>
        </div>
      </div>

      {/* Conteudo principal */}
      <div className="flex-1 flex overflow-hidden">
        {/* Tabela */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="p-3 border-b flex items-center gap-3">
            <Select value={filtroStatus} onValueChange={setFiltroStatus}>
              <SelectTrigger className="w-32 h-8">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="ativo">Ativo</SelectItem>
                <SelectItem value="erro">Com Erro</SelectItem>
                <SelectItem value="inativo">Inativo</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filtroCategoria} onValueChange={setFiltroCategoria}>
              <SelectTrigger className="w-32 h-8">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todas</SelectItem>
                {categorias.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span className="text-xs text-muted-foreground ml-auto">
              {integracoesFiltradas.length} de {integracoesData.length} integracoes
            </span>
          </div>

          <div className="flex-1 overflow-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-[250px]">Integracao</TableHead>
                  <TableHead className="w-[100px]">Categoria</TableHead>
                  <TableHead className="w-[80px]">Status</TableHead>
                  <TableHead className="w-[140px]">Ultima Sync</TableHead>
                  <TableHead className="w-[140px]">Proxima Sync</TableHead>
                  <TableHead className="w-[100px] text-right">Registros</TableHead>
                  <TableHead className="w-[80px] text-right">Erros</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {integracoesFiltradas.map((integracao) => (
                  <TableRow key={integracao.id} className="h-14">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center">
                          <integracao.icon className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">{integracao.nome}</div>
                          <div className="text-xs text-muted-foreground">{integracao.descricao}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{integracao.categoria}</Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(integracao.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        {integracao.ultimaSync}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{integracao.proximaSync}</div>
                      <div className="text-xs text-muted-foreground">({integracao.intervalo})</div>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {integracao.registrosSyncMes.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      {integracao.errosMes > 0 ? (
                        <span className="text-red-600 font-medium">{integracao.errosMes}</span>
                      ) : (
                        <span className="text-muted-foreground">0</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              setIntegracaoSelecionada(integracao)
                              setShowDetalhesDialog(true)
                            }}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Ver Detalhes
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Executar Sync
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Settings className="h-4 w-4 mr-2" />
                            Configurar
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {integracao.status === "ativo" ? (
                            <DropdownMenuItem>
                              <Pause className="h-4 w-4 mr-2" />
                              Pausar
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem>
                              <Play className="h-4 w-4 mr-2" />
                              Ativar
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Remover
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

        {/* Atividade Recente */}
        <div className="w-72 border-l flex flex-col bg-card">
          <div className="p-3 border-b flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium text-sm">Atividade</span>
            </div>
            <Button variant="link" size="sm" className="h-auto p-0 text-xs">
              Ver mais
            </Button>
          </div>
          <div className="flex-1 overflow-auto p-3 space-y-3">
            {atividadeRecente.map((item, idx) => (
              <div key={idx} className="text-sm">
                <div className="font-medium flex items-center gap-2">
                  {item.tipo === "sucesso" && <CheckCircle className="h-3 w-3 text-emerald-600" />}
                  {item.tipo === "erro" && <AlertTriangle className="h-3 w-3 text-red-600" />}
                  {item.tipo === "info" && <Zap className="h-3 w-3 text-blue-600" />}
                  {item.acao}
                </div>
                <div className="text-xs text-muted-foreground">{item.detalhe}</div>
                <div className="text-xs text-muted-foreground mt-1">{item.tempo} atras</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cards de Acesso Rapido */}
      <div className="border-t p-3 bg-muted/30">
        <div className="grid grid-cols-4 gap-3">
          <Button variant="outline" className="h-14 justify-start gap-3 bg-card">
            <Database className="h-5 w-5 text-blue-600" />
            <div className="text-left">
              <div className="text-sm font-medium">ERP e Bancos</div>
              <div className="text-xs text-muted-foreground">4 integracoes ativas</div>
            </div>
          </Button>
          <Button variant="outline" className="h-14 justify-start gap-3 bg-card">
            <Building2 className="h-5 w-5 text-amber-600" />
            <div className="text-left">
              <div className="text-sm font-medium">Governo</div>
              <div className="text-xs text-muted-foreground">eSocial, SEFAZ</div>
            </div>
          </Button>
          <Button variant="outline" className="h-14 justify-start gap-3 bg-card">
            <FileText className="h-5 w-5 text-emerald-600" />
            <div className="text-left">
              <div className="text-sm font-medium">Fiscal</div>
              <div className="text-xs text-muted-foreground">NFe, NFSe</div>
            </div>
          </Button>
          <Button variant="outline" className="h-14 justify-start gap-3 bg-card">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <div className="text-left">
              <div className="text-sm font-medium">Logs de Erro</div>
              <div className="text-xs text-muted-foreground">{totalErros} erros este mes</div>
            </div>
          </Button>
        </div>
      </div>

      {/* Dialog Nova Integracao */}
      <Dialog open={showConfigDialog} onOpenChange={setShowConfigDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Nova Integracao</DialogTitle>
            <DialogDescription>Configure uma nova conexao com sistema externo</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Tipo de Integracao</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="erp">ERP</SelectItem>
                  <SelectItem value="banco">Bancario</SelectItem>
                  <SelectItem value="governo">Governo</SelectItem>
                  <SelectItem value="fiscal">Fiscal</SelectItem>
                  <SelectItem value="rh">RH</SelectItem>
                  <SelectItem value="outro">Outro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Nome da Integracao</Label>
              <Input placeholder="Ex: Banco Santander" />
            </div>
            <div className="space-y-2">
              <Label>Descricao</Label>
              <Input placeholder="Descricao da integracao" />
            </div>
            <div className="space-y-2">
              <Label>Intervalo de Sync</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15min">A cada 15 minutos</SelectItem>
                  <SelectItem value="30min">A cada 30 minutos</SelectItem>
                  <SelectItem value="1hora">A cada 1 hora</SelectItem>
                  <SelectItem value="diario">Diario</SelectItem>
                  <SelectItem value="manual">Manual</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfigDialog(false)}>
              Cancelar
            </Button>
            <Button>Criar Integracao</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog Detalhes */}
      <Dialog open={showDetalhesDialog} onOpenChange={setShowDetalhesDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {integracaoSelecionada && (
                <>
                  <integracaoSelecionada.icon className="h-5 w-5" />
                  {integracaoSelecionada.nome}
                </>
              )}
            </DialogTitle>
            <DialogDescription>{integracaoSelecionada?.descricao}</DialogDescription>
          </DialogHeader>
          {integracaoSelecionada && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-muted-foreground">Status</div>
                  <div className="mt-1">{getStatusBadge(integracaoSelecionada.status)}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Categoria</div>
                  <div className="mt-1">
                    <Badge variant="outline">{integracaoSelecionada.categoria}</Badge>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Ultima Sync</div>
                  <div className="text-sm font-medium mt-1">{integracaoSelecionada.ultimaSync}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Proxima Sync</div>
                  <div className="text-sm font-medium mt-1">{integracaoSelecionada.proximaSync}</div>
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-2">Performance do Mes</div>
                <div className="flex items-center gap-4">
                  <div>
                    <div className="text-2xl font-bold">{integracaoSelecionada.registrosSyncMes.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Registros</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-red-600">{integracaoSelecionada.errosMes}</div>
                    <div className="text-xs text-muted-foreground">Erros</div>
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-muted-foreground mb-1">Taxa de Sucesso</div>
                    <Progress
                      value={
                        integracaoSelecionada.registrosSyncMes > 0
                          ? ((integracaoSelecionada.registrosSyncMes - integracaoSelecionada.errosMes) /
                              integracaoSelecionada.registrosSyncMes) *
                            100
                          : 0
                      }
                      className="h-2"
                    />
                  </div>
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-2">Ultimos Logs</div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-emerald-600" />
                    <span>09/01/2026 14:30 - Sync concluido (234 registros)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-emerald-600" />
                    <span>09/01/2026 14:00 - Sync concluido (189 registros)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-3 w-3 text-amber-600" />
                    <span>09/01/2026 13:30 - Timeout (retry automatico)</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDetalhesDialog(false)}>
              Fechar
            </Button>
            <Button>
              <RefreshCw className="h-4 w-4 mr-1" />
              Executar Sync
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
        </div>
      </main>
    </div>
  )
}
