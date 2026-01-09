"use client"

import { useState } from "react"
import {
  Search,
  ChevronRight,
  ChevronDown,
  Shield,
  Eye,
  Plus,
  Pencil,
  Trash2,
  Printer,
  Download,
  CheckCircle,
  AlertTriangle,
  Copy,
  RotateCcw,
  Save,
  FileText,
  Users,
  Building2,
  ShoppingCart,
  DollarSign,
  BarChart3,
  Settings,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { TooltipProvider } from "@/components/ui/tooltip"

// Estrutura de modulos do sistema
const modulosData = [
  {
    id: "comercial",
    nome: "Comercial",
    icon: ShoppingCart,
    expandido: true,
    rotinas: [
      { id: "com-propostas", nome: "Propostas" },
      { id: "com-contratos", nome: "Contratos" },
      { id: "com-medicoes", nome: "Medicoes" },
      { id: "com-clientes", nome: "Clientes" },
      { id: "com-relatorios", nome: "Relatorios" },
    ],
  },
  {
    id: "suprimentos",
    nome: "Suprimentos",
    icon: Building2,
    expandido: false,
    rotinas: [
      { id: "sup-requisicoes", nome: "Requisicoes" },
      { id: "sup-cotacoes", nome: "Cotacoes" },
      { id: "sup-pedidos", nome: "Pedidos de Compra" },
      { id: "sup-recebimento", nome: "Recebimento" },
      { id: "sup-fornecedores", nome: "Fornecedores" },
      { id: "sup-estoque", nome: "Estoque" },
    ],
  },
  {
    id: "financeiro",
    nome: "Financeiro",
    icon: DollarSign,
    expandido: false,
    rotinas: [
      { id: "fin-contas-pagar", nome: "Contas a Pagar" },
      { id: "fin-contas-receber", nome: "Contas a Receber" },
      { id: "fin-fluxo-caixa", nome: "Fluxo de Caixa" },
      { id: "fin-conciliacao", nome: "Conciliacao Bancaria" },
      { id: "fin-relatorios", nome: "Relatorios" },
    ],
  },
  {
    id: "rh",
    nome: "Recursos Humanos",
    icon: Users,
    expandido: false,
    rotinas: [
      { id: "rh-pessoas", nome: "Pessoas" },
      { id: "rh-ponto", nome: "Ponto" },
      { id: "rh-folha", nome: "Folha de Pagamento" },
      { id: "rh-beneficios", nome: "Beneficios" },
      { id: "rh-ferias", nome: "Ferias" },
      { id: "rh-documentos", nome: "Documentos" },
    ],
  },
  {
    id: "producao",
    nome: "Producao",
    icon: BarChart3,
    expandido: false,
    rotinas: [
      { id: "prod-rdo", nome: "RDO" },
      { id: "prod-apropriacao", nome: "Apropriacao" },
      { id: "prod-medicao-fisica", nome: "Medicao Fisica" },
      { id: "prod-avancos", nome: "Avancos" },
    ],
  },
  {
    id: "engenharia",
    nome: "Engenharia",
    icon: FileText,
    expandido: false,
    rotinas: [
      { id: "eng-projetos", nome: "Projetos" },
      { id: "eng-orcamentos", nome: "Orcamentos" },
      { id: "eng-planejamento", nome: "Planejamento" },
      { id: "eng-qualidade", nome: "Qualidade" },
    ],
  },
]

// Acoes disponiveis
const acoes = [
  { id: "visualizar", nome: "Visualizar", icon: Eye, cor: "text-blue-600" },
  { id: "criar", nome: "Criar", icon: Plus, cor: "text-green-600" },
  { id: "editar", nome: "Editar", icon: Pencil, cor: "text-amber-600" },
  { id: "excluir", nome: "Excluir", icon: Trash2, cor: "text-red-600" },
  { id: "imprimir", nome: "Imprimir", icon: Printer, cor: "text-purple-600" },
  { id: "exportar", nome: "Exportar", icon: Download, cor: "text-cyan-600" },
  { id: "aprovar", nome: "Aprovar", icon: CheckCircle, cor: "text-emerald-600" },
]

// Perfis de exemplo
const perfisData = [
  { id: "admin", nome: "Administrador", usuarios: 3 },
  { id: "gerente-comercial", nome: "Gerente Comercial", usuarios: 5 },
  { id: "analista-suprimentos", nome: "Analista Suprimentos", usuarios: 12 },
  { id: "coordenador-rh", nome: "Coordenador RH", usuarios: 4 },
  { id: "engenheiro-obra", nome: "Engenheiro de Obra", usuarios: 28 },
  { id: "assistente-financeiro", nome: "Assistente Financeiro", usuarios: 8 },
  { id: "auditor", nome: "Auditor (Somente Leitura)", usuarios: 2 },
]

// Permissoes por perfil (exemplo)
const permissoesIniciais: Record<string, Record<string, string[]>> = {
  admin: {
    "com-propostas": ["visualizar", "criar", "editar", "excluir", "imprimir", "exportar", "aprovar"],
    "com-contratos": ["visualizar", "criar", "editar", "excluir", "imprimir", "exportar", "aprovar"],
    "com-medicoes": ["visualizar", "criar", "editar", "excluir", "imprimir", "exportar", "aprovar"],
    "sup-requisicoes": ["visualizar", "criar", "editar", "excluir", "imprimir", "exportar", "aprovar"],
    "sup-pedidos": ["visualizar", "criar", "editar", "excluir", "imprimir", "exportar", "aprovar"],
    "fin-contas-pagar": ["visualizar", "criar", "editar", "excluir", "imprimir", "exportar", "aprovar"],
    "rh-pessoas": ["visualizar", "criar", "editar", "excluir", "imprimir", "exportar", "aprovar"],
  },
  "gerente-comercial": {
    "com-propostas": ["visualizar", "criar", "editar", "imprimir", "exportar", "aprovar"],
    "com-contratos": ["visualizar", "criar", "editar", "imprimir", "exportar"],
    "com-medicoes": ["visualizar", "criar", "editar", "imprimir", "exportar", "aprovar"],
    "com-clientes": ["visualizar", "criar", "editar", "imprimir", "exportar"],
  },
  "analista-suprimentos": {
    "sup-requisicoes": ["visualizar", "criar", "editar", "imprimir", "exportar"],
    "sup-cotacoes": ["visualizar", "criar", "editar", "imprimir", "exportar"],
    "sup-pedidos": ["visualizar", "criar", "editar", "imprimir", "exportar"],
    "sup-recebimento": ["visualizar", "criar", "editar"],
    "sup-fornecedores": ["visualizar", "criar", "editar"],
    "sup-estoque": ["visualizar"],
  },
  auditor: {
    "com-propostas": ["visualizar"],
    "com-contratos": ["visualizar"],
    "com-medicoes": ["visualizar"],
    "sup-requisicoes": ["visualizar"],
    "sup-pedidos": ["visualizar"],
    "fin-contas-pagar": ["visualizar"],
    "fin-contas-receber": ["visualizar"],
    "rh-pessoas": ["visualizar"],
  },
}

export default function PermissoesPage() {
  const [perfilSelecionado, setPerfilSelecionado] = useState("gerente-comercial")
  const [modulos, setModulos] = useState(modulosData)
  const [rotinaSelecionada, setRotinaSelecionada] = useState<string | null>("com-propostas")
  const [busca, setBusca] = useState("")
  const [permissoes, setPermissoes] = useState(permissoesIniciais)
  const [alteracoesPendentes, setAlteracoesPendentes] = useState(false)
  const [showCompararDialog, setShowCompararDialog] = useState(false)
  const [perfilComparar, setPerfilComparar] = useState("")
  const [showHistoricoDialog, setShowHistoricoDialog] = useState(false)

  const toggleModulo = (moduloId: string) => {
    setModulos(modulos.map((m) => (m.id === moduloId ? { ...m, expandido: !m.expandido } : m)))
  }

  const getPermissoesRotina = (rotinaId: string) => {
    return permissoes[perfilSelecionado]?.[rotinaId] || []
  }

  const togglePermissao = (rotinaId: string, acaoId: string) => {
    const perfilPerms = permissoes[perfilSelecionado] || {}
    const rotinaPerms = perfilPerms[rotinaId] || []

    let novasPerms: string[]
    if (rotinaPerms.includes(acaoId)) {
      novasPerms = rotinaPerms.filter((p) => p !== acaoId)
    } else {
      novasPerms = [...rotinaPerms, acaoId]
    }

    setPermissoes({
      ...permissoes,
      [perfilSelecionado]: {
        ...perfilPerms,
        [rotinaId]: novasPerms,
      },
    })
    setAlteracoesPendentes(true)
  }

  const marcarTodas = (rotinaId: string) => {
    const perfilPerms = permissoes[perfilSelecionado] || {}
    setPermissoes({
      ...permissoes,
      [perfilSelecionado]: {
        ...perfilPerms,
        [rotinaId]: acoes.map((a) => a.id),
      },
    })
    setAlteracoesPendentes(true)
  }

  const desmarcarTodas = (rotinaId: string) => {
    const perfilPerms = permissoes[perfilSelecionado] || {}
    setPermissoes({
      ...permissoes,
      [perfilSelecionado]: {
        ...perfilPerms,
        [rotinaId]: [],
      },
    })
    setAlteracoesPendentes(true)
  }

  const salvarAlteracoes = () => {
    setAlteracoesPendentes(false)
    // Aqui salvaria no backend
  }

  const getNomeRotina = (rotinaId: string) => {
    for (const modulo of modulos) {
      const rotina = modulo.rotinas.find((r) => r.id === rotinaId)
      if (rotina) return rotina.nome
    }
    return rotinaId
  }

  const contarPermissoes = (perfilId: string) => {
    const perfilPerms = permissoes[perfilId] || {}
    return Object.values(perfilPerms).reduce((acc, perms) => acc + perms.length, 0)
  }

  const contarPermissoesCriticas = (perfilId: string) => {
    const perfilPerms = permissoes[perfilId] || {}
    let count = 0
    Object.values(perfilPerms).forEach((perms) => {
      if (perms.includes("excluir") || perms.includes("aprovar")) count++
    })
    return count
  }

  // Atividade recente
  const atividadeRecente = [
    {
      acao: "Permissao adicionada",
      detalhe: "Aprovar em Medicoes → Gerente Comercial",
      tempo: "5 min",
      usuario: "Admin",
    },
    { acao: "Permissao removida", detalhe: "Excluir em Contratos → Analista", tempo: "15 min", usuario: "Admin" },
    { acao: "Perfil clonado", detalhe: "Engenheiro Obra → Engenheiro Jr", tempo: "1h", usuario: "Admin" },
    { acao: "Permissoes resetadas", detalhe: "Assistente Financeiro", tempo: "2h", usuario: "Admin" },
    { acao: "Nova rotina", detalhe: "Dashboard BI adicionado", tempo: "3h", usuario: "Sistema" },
  ]

  return (
    <TooltipProvider>
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-background">
        {/* Header */}
        <div className="h-14 border-b flex items-center justify-between px-4 bg-card">
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-primary" />
            <div>
              <h1 className="font-semibold text-sm">Matriz de Permissoes</h1>
              <p className="text-xs text-muted-foreground">Configure acoes por perfil e rotina</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar rotina..."
                className="pl-8 h-8 text-sm"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm" onClick={() => setShowCompararDialog(true)}>
              <Copy className="h-4 w-4 mr-1" />
              Comparar
            </Button>
            <Button variant="outline" size="sm" onClick={() => setShowHistoricoDialog(true)}>
              <Clock className="h-4 w-4 mr-1" />
              Historico
            </Button>
            {alteracoesPendentes && (
              <Button size="sm" onClick={salvarAlteracoes}>
                <Save className="h-4 w-4 mr-1" />
                Salvar
              </Button>
            )}
          </div>
        </div>

        {/* Barra de alertas */}
        {alteracoesPendentes && (
          <div className="h-9 bg-amber-50 border-b border-amber-200 flex items-center px-4 text-sm">
            <AlertTriangle className="h-4 w-4 text-amber-600 mr-2" />
            <span className="text-amber-800">Voce tem alteracoes nao salvas</span>
            <Button variant="link" size="sm" className="text-amber-700 ml-2 h-auto p-0" onClick={salvarAlteracoes}>
              Salvar agora
            </Button>
          </div>
        )}

        {/* Metricas */}
        <div className="grid grid-cols-6 gap-3 p-4 border-b bg-muted/30">
          <div className="bg-card rounded-lg border p-3">
            <div className="text-2xl font-bold">{perfisData.length}</div>
            <div className="text-xs text-muted-foreground">Perfis</div>
          </div>
          <div className="bg-card rounded-lg border p-3">
            <div className="text-2xl font-bold">{modulos.reduce((acc, m) => acc + m.rotinas.length, 0)}</div>
            <div className="text-xs text-muted-foreground">Rotinas</div>
          </div>
          <div className="bg-card rounded-lg border p-3">
            <div className="text-2xl font-bold">{acoes.length}</div>
            <div className="text-xs text-muted-foreground">Acoes</div>
          </div>
          <div className="bg-card rounded-lg border p-3">
            <div className="text-2xl font-bold text-primary">{contarPermissoes(perfilSelecionado)}</div>
            <div className="text-xs text-muted-foreground">Permissoes do Perfil</div>
          </div>
          <div className="bg-card rounded-lg border p-3">
            <div className="text-2xl font-bold text-amber-600">{contarPermissoesCriticas(perfilSelecionado)}</div>
            <div className="text-xs text-muted-foreground">Permissoes Criticas</div>
          </div>
          <div className="bg-card rounded-lg border p-3">
            <div className="text-2xl font-bold text-emerald-600">
              {perfisData.find((p) => p.id === perfilSelecionado)?.usuarios || 0}
            </div>
            <div className="text-xs text-muted-foreground">Usuarios no Perfil</div>
          </div>
        </div>

        {/* Conteudo principal */}
        <div className="flex-1 flex overflow-hidden">
          {/* Coluna esquerda - Seletor de Perfil + Arvore de Modulos */}
          <div className="w-72 border-r flex flex-col bg-card">
            {/* Seletor de Perfil */}
            <div className="p-3 border-b">
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Perfil</label>
              <Select value={perfilSelecionado} onValueChange={setPerfilSelecionado}>
                <SelectTrigger className="h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {perfisData.map((perfil) => (
                    <SelectItem key={perfil.id} value={perfil.id}>
                      <div className="flex items-center justify-between w-full">
                        <span>{perfil.nome}</span>
                        <Badge variant="secondary" className="ml-2 text-xs">
                          {perfil.usuarios}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Arvore de Modulos */}
            <div className="flex-1 overflow-auto p-2">
              <div className="text-xs font-medium text-muted-foreground px-2 mb-2">Modulos e Rotinas</div>
              {modulos.map((modulo) => (
                <div key={modulo.id} className="mb-1">
                  <button
                    onClick={() => toggleModulo(modulo.id)}
                    className="w-full flex items-center gap-2 px-2 py-1.5 rounded hover:bg-muted text-sm font-medium"
                  >
                    {modulo.expandido ? (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    )}
                    <modulo.icon className="h-4 w-4 text-muted-foreground" />
                    <span>{modulo.nome}</span>
                  </button>
                  {modulo.expandido && (
                    <div className="ml-6 mt-0.5">
                      {modulo.rotinas
                        .filter((r) => !busca || r.nome.toLowerCase().includes(busca.toLowerCase()))
                        .map((rotina) => {
                          const perms = getPermissoesRotina(rotina.id)
                          return (
                            <button
                              key={rotina.id}
                              onClick={() => setRotinaSelecionada(rotina.id)}
                              className={`w-full flex items-center justify-between px-2 py-1 rounded text-sm ${
                                rotinaSelecionada === rotina.id
                                  ? "bg-primary text-primary-foreground"
                                  : "hover:bg-muted"
                              }`}
                            >
                              <span>{rotina.nome}</span>
                              {perms.length > 0 && (
                                <Badge
                                  variant={rotinaSelecionada === rotina.id ? "secondary" : "outline"}
                                  className="text-xs h-5"
                                >
                                  {perms.length}
                                </Badge>
                              )}
                            </button>
                          )
                        })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Coluna central - Configuracao de Permissoes */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {rotinaSelecionada ? (
              <>
                {/* Header da rotina */}
                <div className="p-4 border-b bg-muted/30 flex items-center justify-between">
                  <div>
                    <h2 className="font-semibold">{getNomeRotina(rotinaSelecionada)}</h2>
                    <p className="text-xs text-muted-foreground">Configure as permissoes para esta rotina</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => marcarTodas(rotinaSelecionada)}>
                      Marcar Todas
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => desmarcarTodas(rotinaSelecionada)}>
                      Desmarcar Todas
                    </Button>
                  </div>
                </div>

                {/* Grid de permissoes */}
                <div className="flex-1 overflow-auto p-4">
                  <div className="grid grid-cols-1 gap-3">
                    {acoes.map((acao) => {
                      const temPermissao = getPermissoesRotina(rotinaSelecionada).includes(acao.id)
                      const isCritica = acao.id === "excluir" || acao.id === "aprovar"

                      return (
                        <div
                          key={acao.id}
                          className={`flex items-center justify-between p-3 rounded-lg border ${
                            temPermissao ? "bg-primary/5 border-primary/20" : "bg-card"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Checkbox
                              checked={temPermissao}
                              onCheckedChange={() => togglePermissao(rotinaSelecionada, acao.id)}
                              id={acao.id}
                            />
                            <acao.icon className={`h-5 w-5 ${acao.cor}`} />
                            <div>
                              <label htmlFor={acao.id} className="font-medium text-sm cursor-pointer">
                                {acao.nome}
                              </label>
                              {isCritica && (
                                <div className="flex items-center gap-1 mt-0.5">
                                  <AlertTriangle className="h-3 w-3 text-amber-500" />
                                  <span className="text-xs text-amber-600">Permissao critica</span>
                                </div>
                              )}
                            </div>
                          </div>
                          {temPermissao && (
                            <Badge variant="default" className="bg-emerald-600">
                              Ativo
                            </Badge>
                          )}
                        </div>
                      )
                    })}
                  </div>

                  {/* Resumo em linguagem natural */}
                  <div className="mt-6 p-4 bg-muted/50 rounded-lg border">
                    <h3 className="text-sm font-medium mb-2">Resumo da Permissao</h3>
                    <p className="text-sm text-muted-foreground">
                      O perfil <strong>{perfisData.find((p) => p.id === perfilSelecionado)?.nome}</strong> pode{" "}
                      {getPermissoesRotina(rotinaSelecionada).length > 0 ? (
                        <>
                          <strong>{getPermissoesRotina(rotinaSelecionada).join(", ")}</strong> em{" "}
                          <strong>{getNomeRotina(rotinaSelecionada)}</strong>.
                        </>
                      ) : (
                        <>
                          <strong>nao possui acesso</strong> a <strong>{getNomeRotina(rotinaSelecionada)}</strong>.
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <Shield className="h-12 w-12 mx-auto mb-3 opacity-20" />
                  <p>Selecione uma rotina para configurar permissoes</p>
                </div>
              </div>
            )}
          </div>

          {/* Coluna direita - Atividade */}
          <div className="w-72 border-l bg-card flex flex-col">
            <div className="p-3 border-b flex items-center justify-between">
              <span className="text-sm font-medium">Atividade Recente</span>
              <Button variant="ghost" size="sm" className="text-xs h-7">
                Ver todas
              </Button>
            </div>
            <div className="flex-1 overflow-auto p-3 space-y-3">
              {atividadeRecente.map((item, index) => (
                <div key={index} className="text-sm">
                  <div className="font-medium">{item.acao}</div>
                  <div className="text-xs text-muted-foreground">{item.detalhe}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {item.usuario} • {item.tempo}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cards de acao rapida */}
        <div className="border-t p-3 bg-card">
          <div className="grid grid-cols-4 gap-3">
            <button className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted text-left">
              <Copy className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="font-medium text-sm">Clonar Perfil</div>
                <div className="text-xs text-muted-foreground">Criar copia com ajustes</div>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground ml-auto" />
            </button>
            <button className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted text-left">
              <RotateCcw className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="font-medium text-sm">Resetar Perfil</div>
                <div className="text-xs text-muted-foreground">Voltar ao padrao</div>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground ml-auto" />
            </button>
            <button className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted text-left">
              <Download className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="font-medium text-sm">Exportar Matriz</div>
                <div className="text-xs text-muted-foreground">Excel ou PDF</div>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground ml-auto" />
            </button>
            <button className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted text-left">
              <Settings className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="font-medium text-sm">Config. Avancadas</div>
                <div className="text-xs text-muted-foreground">Niveis e restricoes</div>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground ml-auto" />
            </button>
          </div>
        </div>

        {/* Dialog Comparar Perfis */}
        <Dialog open={showCompararDialog} onOpenChange={setShowCompararDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Comparar Perfis</DialogTitle>
              <DialogDescription>Compare as permissoes entre dois perfis para identificar diferencas</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Perfil A</label>
                <Select value={perfilSelecionado} onValueChange={setPerfilSelecionado}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {perfisData.map((perfil) => (
                      <SelectItem key={perfil.id} value={perfil.id}>
                        {perfil.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Perfil B</label>
                <Select value={perfilComparar} onValueChange={setPerfilComparar}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    {perfisData
                      .filter((p) => p.id !== perfilSelecionado)
                      .map((perfil) => (
                        <SelectItem key={perfil.id} value={perfil.id}>
                          {perfil.nome}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            {perfilComparar && (
              <div className="border rounded-lg p-4 max-h-64 overflow-auto">
                <div className="text-sm font-medium mb-2">Diferencas encontradas:</div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-emerald-600">+</Badge>
                    <span>
                      Aprovar em Medicoes (apenas em {perfisData.find((p) => p.id === perfilSelecionado)?.nome})
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-red-600">-</Badge>
                    <span>
                      Excluir em Contratos (apenas em {perfisData.find((p) => p.id === perfilComparar)?.nome})
                    </span>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCompararDialog(false)}>
                Fechar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Dialog Historico */}
        <Dialog open={showHistoricoDialog} onOpenChange={setShowHistoricoDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Historico de Alteracoes</DialogTitle>
              <DialogDescription>Veja todas as alteracoes de permissoes realizadas</DialogDescription>
            </DialogHeader>
            <div className="py-4 max-h-80 overflow-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 font-medium">Data/Hora</th>
                    <th className="text-left py-2 font-medium">Usuario</th>
                    <th className="text-left py-2 font-medium">Acao</th>
                    <th className="text-left py-2 font-medium">Detalhes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 text-muted-foreground">09/01/2026 14:32</td>
                    <td className="py-2">Admin</td>
                    <td className="py-2">
                      <Badge variant="outline">Adicionada</Badge>
                    </td>
                    <td className="py-2">Aprovar em Medicoes → Gerente Comercial</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 text-muted-foreground">09/01/2026 14:15</td>
                    <td className="py-2">Admin</td>
                    <td className="py-2">
                      <Badge variant="outline" className="border-red-300 text-red-600">
                        Removida
                      </Badge>
                    </td>
                    <td className="py-2">Excluir em Contratos → Analista</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 text-muted-foreground">08/01/2026 09:20</td>
                    <td className="py-2">Admin</td>
                    <td className="py-2">
                      <Badge variant="outline">Perfil clonado</Badge>
                    </td>
                    <td className="py-2">Engenheiro Obra → Engenheiro Jr</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowHistoricoDialog(false)}>
                Fechar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  )
}
