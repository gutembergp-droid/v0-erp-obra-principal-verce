"use client"

import { useState } from "react"
import { ConsoleNavbar } from "../_components/console-navbar"
import {
  Users,
  Shield,
  GitBranch,
  Plus,
  Copy,
  Pencil,
  GitCompare,
  Search,
  ChevronRight,
  ChevronDown,
  Eye,
  FileEdit,
  Trash2,
  CheckCircle,
  XCircle,
  Download,
  AlertTriangle,
  Building2,
  User,
  Clock,
  Play,
  Info,
  Crown,
  ArrowRight,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Dados de exemplo - Perfis
const perfisData = [
  {
    id: 1,
    nome: "DP – Cadastro de Funcionário",
    departamento: "Recursos Humanos",
    setor: "Departamento Pessoal",
    descricao: "Usuário responsável apenas pelo cadastro e manutenção básica de funcionários.",
    permissoes: 2,
    usuarios: 3,
    ultimaAlteracao: "08/01/2026",
    permissoesDetalhadas: [
      {
        rotina: "RH > Departamento Pessoal > Cadastro de Funcionário",
        acoes: {
          ver: false,
          criar: true,
          editar: true,
          excluir: false,
          aprovar: false,
          cancelar: false,
          exportar: false,
        },
        nivelVisao: "MEU",
      },
    ],
    restricoes: ["Folha de Pagamento", "Benefícios", "Rescisão", "Relatórios de RH"],
    resumo:
      "O usuário vê apenas a tela 'Cadastro de Funcionário'. O menu exibe somente esta opção. O histórico mostra apenas os registros criados por ele.",
  },
  {
    id: 2,
    nome: "Suprimentos – Pedido",
    departamento: "Suprimentos",
    setor: "Pedidos",
    descricao: "Usuário responsável pela criação e acompanhamento de pedidos de compra.",
    permissoes: 3,
    usuarios: 5,
    ultimaAlteracao: "07/01/2026",
    permissoesDetalhadas: [
      {
        rotina: "Suprimentos > Pedidos > Pedido",
        acoes: {
          ver: true,
          criar: true,
          editar: true,
          excluir: false,
          aprovar: false,
          cancelar: false,
          exportar: false,
        },
        nivelVisao: "SETOR",
      },
    ],
    restricoes: ["Contratos", "Cotações", "Financeiro", "Pagamentos"],
    resumo:
      "O menu mostra apenas 'Pedidos'. A listagem mostra pedidos do setor. Pedidos acima do limite seguem automaticamente para aprovação.",
  },
  {
    id: 3,
    nome: "Comercial – Governante",
    departamento: "Comercial",
    setor: "Governança",
    descricao: "Responsável máximo do departamento comercial, com poder de aprovação.",
    permissoes: 8,
    usuarios: 1,
    ultimaAlteracao: "05/01/2026",
    permissoesDetalhadas: [
      {
        rotina: "Comercial > Propostas",
        acoes: {
          ver: true,
          criar: true,
          editar: true,
          excluir: false,
          aprovar: true,
          cancelar: false,
          exportar: false,
        },
        nivelVisao: "DEPARTAMENTO",
      },
      {
        rotina: "Comercial > Contratos",
        acoes: {
          ver: true,
          criar: false,
          editar: false,
          excluir: false,
          aprovar: true,
          cancelar: false,
          exportar: false,
        },
        nivelVisao: "DEPARTAMENTO",
      },
      {
        rotina: "Comercial > Relatórios",
        acoes: {
          ver: true,
          criar: false,
          editar: false,
          excluir: false,
          aprovar: false,
          cancelar: false,
          exportar: true,
        },
        nivelVisao: "DEPARTAMENTO",
      },
    ],
    restricoes: [],
    resumo:
      "Atua como aprovador final do departamento. Visualiza tudo do Comercial. Não acessa rotinas de outros departamentos.",
    permissoesEspeciais: [
      "Aprovação automática de solicitações vindas de subordinados",
      "Visualização consolidada do departamento",
      "Recebe todas as solicitações pendentes de aprovação do Comercial",
    ],
  },
  {
    id: 4,
    nome: "Financeiro – Analista",
    departamento: "Financeiro",
    setor: "Contas a Pagar",
    descricao: "Analista financeiro com acesso a contas a pagar e relatórios.",
    permissoes: 5,
    usuarios: 4,
    ultimaAlteracao: "06/01/2026",
    permissoesDetalhadas: [],
    restricoes: ["Aprovação de pagamentos", "Configurações"],
    resumo: "Acessa rotinas de contas a pagar do setor financeiro.",
  },
]

// Dados de exemplo - Governantes
const governantesData = [
  { departamento: "Comercial", governante: "João Silva", email: "joao.comercial@empresa.com" },
  { departamento: "Suprimentos", governante: "Maria Souza", email: "maria.suprimentos@empresa.com" },
  { departamento: "Recursos Humanos", governante: "Carlos Lima", email: "carlos.rh@empresa.com" },
  { departamento: "Financeiro", governante: "Diretoria", email: "diretoria@empresa.com" },
]

// Dados de exemplo - Regras de Aprovação
const regrasAprovacao = [
  {
    id: 1,
    tipo: "Pedido de Compra",
    condicao: "Até R$ 5.000",
    aprovador: "Gestor Direto",
    sla: "24h",
  },
  {
    id: 2,
    tipo: "Pedido de Compra",
    condicao: "De R$ 5.001 até R$ 50.000",
    aprovador: "Governante do Departamento (Suprimentos)",
    sla: "48h",
  },
  {
    id: 3,
    tipo: "Pedido de Compra",
    condicao: "Acima de R$ 50.000",
    aprovador: "Diretoria",
    sla: "72h",
  },
  {
    id: 4,
    tipo: "Contrato Comercial",
    condicao: "Qualquer valor",
    aprovador: "Governante do Departamento Comercial",
    sla: "48h",
  },
]

// Árvore de Rotinas
const arvoreRotinas = [
  {
    id: "rh",
    nome: "Recursos Humanos",
    icone: Users,
    filhos: [
      {
        id: "rh-dp",
        nome: "Departamento Pessoal",
        filhos: [
          { id: "rh-dp-cadastro", nome: "Cadastro de Funcionário", rotina: true },
          { id: "rh-dp-documentos", nome: "Documentos", rotina: true },
          { id: "rh-dp-ferias", nome: "Férias", rotina: true },
          { id: "rh-dp-afastamentos", nome: "Afastamentos", rotina: true },
        ],
      },
      {
        id: "rh-folha",
        nome: "Folha de Pagamento",
        filhos: [
          { id: "rh-folha-previa", nome: "Prévia de Folha", rotina: true },
          { id: "rh-folha-fechamento", nome: "Fechamento", rotina: true },
        ],
      },
      {
        id: "rh-beneficios",
        nome: "Benefícios",
        filhos: [
          { id: "rh-beneficios-vt", nome: "Vale Transporte", rotina: true },
          { id: "rh-beneficios-va", nome: "Vale Alimentação", rotina: true },
        ],
      },
    ],
  },
  {
    id: "suprimentos",
    nome: "Suprimentos",
    icone: Building2,
    filhos: [
      {
        id: "sup-pedidos",
        nome: "Pedidos",
        filhos: [
          { id: "sup-pedidos-pedido", nome: "Pedido", rotina: true },
          { id: "sup-pedidos-acompanhamento", nome: "Acompanhamento", rotina: true },
        ],
      },
      {
        id: "sup-cotacoes",
        nome: "Cotações",
        filhos: [
          { id: "sup-cotacoes-solicitar", nome: "Solicitar Cotação", rotina: true },
          { id: "sup-cotacoes-comparativo", nome: "Comparativo", rotina: true },
        ],
      },
      {
        id: "sup-contratos",
        nome: "Contratos",
        filhos: [{ id: "sup-contratos-lista", nome: "Lista de Contratos", rotina: true }],
      },
    ],
  },
  {
    id: "comercial",
    nome: "Comercial",
    icone: Building2,
    filhos: [
      {
        id: "com-propostas",
        nome: "Propostas",
        filhos: [
          { id: "com-propostas-criar", nome: "Criar Proposta", rotina: true },
          { id: "com-propostas-lista", nome: "Lista de Propostas", rotina: true },
        ],
      },
      {
        id: "com-contratos",
        nome: "Contratos",
        filhos: [{ id: "com-contratos-lista", nome: "Contratos Comerciais", rotina: true }],
      },
      {
        id: "com-relatorios",
        nome: "Relatórios",
        filhos: [
          { id: "com-relatorios-vendas", nome: "Vendas", rotina: true },
          { id: "com-relatorios-pipeline", nome: "Pipeline", rotina: true },
        ],
      },
    ],
  },
  {
    id: "financeiro",
    nome: "Financeiro",
    icone: Building2,
    filhos: [
      {
        id: "fin-contas-pagar",
        nome: "Contas a Pagar",
        filhos: [
          { id: "fin-cp-titulos", nome: "Títulos", rotina: true },
          { id: "fin-cp-pagamentos", nome: "Pagamentos", rotina: true },
        ],
      },
      {
        id: "fin-contas-receber",
        nome: "Contas a Receber",
        filhos: [
          { id: "fin-cr-titulos", nome: "Títulos", rotina: true },
          { id: "fin-cr-baixas", nome: "Baixas", rotina: true },
        ],
      },
    ],
  },
]

// Dados de exemplo - Organograma
const organograma = [
  {
    nome: "Diretoria",
    cargo: "Diretor Geral",
    subordinados: [
      {
        nome: "João Silva",
        cargo: "Governante Comercial",
        subordinados: [
          { nome: "Pedro Santos", cargo: "Analista Comercial", subordinados: [] },
          { nome: "Lucia Ferreira", cargo: "Assistente Comercial", subordinados: [] },
        ],
      },
      {
        nome: "Maria Souza",
        cargo: "Governante Suprimentos",
        subordinados: [
          { nome: "Marcos Pereira", cargo: "Comprador", subordinados: [] },
          { nome: "Ana Costa", cargo: "Auxiliar de Compras", subordinados: [] },
        ],
      },
      {
        nome: "Carlos Lima",
        cargo: "Governante RH",
        subordinados: [
          { nome: "Ana Paula", cargo: "Analista DP", subordinados: [] },
          { nome: "Roberto Alves", cargo: "Assistente RH", subordinados: [] },
        ],
      },
    ],
  },
]

// Usuarios para simulação
const usuariosSimulacao = [
  { id: 1, nome: "Ana Paula", perfil: "DP – Cadastro de Funcionário", departamento: "RH" },
  { id: 2, nome: "Marcos Pereira", perfil: "Suprimentos – Pedido", departamento: "Suprimentos" },
  { id: 3, nome: "João Silva", perfil: "Comercial – Governante", departamento: "Comercial" },
]

export default function PerfisPermissoesPage() {
  const [searchPerfil, setSearchPerfil] = useState("")
  const [perfilSelecionado, setPerfilSelecionado] = useState<(typeof perfisData)[0] | null>(null)
  const [rotinaSelecionada, setRotinaSelecionada] = useState<string | null>(null)
  const [nodosExpandidos, setNodosExpandidos] = useState<string[]>(["rh", "rh-dp"])
  const [dialogSimular, setDialogSimular] = useState(false)
  const [usuarioSimulacao, setUsuarioSimulacao] = useState<string>("")
  const [dialogCriarPerfil, setDialogCriarPerfil] = useState(false)
  const [dialogCompararPerfis, setDialogCompararPerfis] = useState(false)
  const [perfilComparar1, setPerfilComparar1] = useState<string>("")
  const [perfilComparar2, setPerfilComparar2] = useState<string>("")
  const [dialogCriarRegra, setDialogCriarRegra] = useState(false)

  // Permissões para a rotina selecionada (exemplo)
  const [permissoesRotina, setPermissoesRotina] = useState({
    ver: false,
    criar: true,
    editar: true,
    excluir: false,
    aprovar: false,
    cancelar: false,
    exportar: false,
  })
  const [nivelVisao, setNivelVisao] = useState("MEU")

  const toggleNodo = (id: string) => {
    setNodosExpandidos((prev) => (prev.includes(id) ? prev.filter((n) => n !== id) : [...prev, id]))
  }

  const renderArvore = (nodos: any[], nivel = 0) => {
    return nodos.map((nodo) => {
      const temFilhos = nodo.filhos && nodo.filhos.length > 0
      const expandido = nodosExpandidos.includes(nodo.id)
      const selecionado = rotinaSelecionada === nodo.id

      return (
        <div key={nodo.id}>
          <div
            className={`flex items-center gap-2 py-1.5 px-2 rounded cursor-pointer hover:bg-muted/50 ${
              selecionado ? "bg-primary/10 text-primary" : ""
            }`}
            style={{ paddingLeft: `${nivel * 16 + 8}px` }}
            onClick={() => {
              if (temFilhos) {
                toggleNodo(nodo.id)
              }
              if (nodo.rotina) {
                setRotinaSelecionada(nodo.id)
              }
            }}
          >
            {temFilhos ? (
              expandido ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )
            ) : (
              <div className="w-4" />
            )}
            {nodo.icone && <nodo.icone className="h-4 w-4 text-muted-foreground" />}
            <span className={`text-sm ${nodo.rotina ? "text-foreground" : "font-medium"}`}>{nodo.nome}</span>
            {nodo.rotina && (
              <Badge variant="outline" className="ml-auto text-xs">
                Rotina
              </Badge>
            )}
          </div>
          {temFilhos && expandido && renderArvore(nodo.filhos, nivel + 1)}
        </div>
      )
    })
  }

  const renderOrganograma = (pessoas: any[], nivel = 0) => {
    return pessoas.map((pessoa, idx) => (
      <div key={idx} className="ml-4 border-l pl-4" style={{ marginLeft: nivel > 0 ? "16px" : "0" }}>
        <div className="flex items-center gap-2 py-2">
          <div
            className={`h-8 w-8 rounded-full flex items-center justify-center ${
              pessoa.subordinados?.length > 0 ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
            }`}
          >
            {pessoa.subordinados?.length > 0 ? <Crown className="h-4 w-4" /> : <User className="h-4 w-4" />}
          </div>
          <div>
            <p className="text-sm font-medium">{pessoa.nome}</p>
            <p className="text-xs text-muted-foreground">{pessoa.cargo}</p>
          </div>
        </div>
        {pessoa.subordinados && pessoa.subordinados.length > 0 && renderOrganograma(pessoa.subordinados, nivel + 1)}
      </div>
    ))
  }

  const perfisFiltrados = perfisData.filter(
    (p) =>
      p.nome.toLowerCase().includes(searchPerfil.toLowerCase()) ||
      p.departamento.toLowerCase().includes(searchPerfil.toLowerCase()),
  )

  return (
    <div className="flex flex-col h-screen bg-muted/30 overflow-hidden">
      <div className="flex-shrink-0 z-40 mt-0">
        <ConsoleNavbar />
      </div>
      <main className="flex-1 bg-background overflow-hidden p-6">
        <div 
          className="h-full border-0 bg-background overflow-y-auto overflow-x-hidden scrollbar-hide p-6 space-y-6" 
          style={{ 
            borderRadius: '25px', 
            boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.13), 0 2px 8px rgba(0, 0, 0, 0.05)',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Perfis, Permissões & Hierarquia</h1>
          <p className="text-muted-foreground">
            Gerencie perfis de acesso, permissões granulares e fluxos de aprovação
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setDialogSimular(true)}>
            <Play className="h-4 w-4 mr-2" />
            Simular Acesso
          </Button>
          <Button onClick={() => setDialogCriarPerfil(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Criar Perfil
          </Button>
        </div>
      </div>

      {/* Tabs Principais */}
      <Tabs defaultValue="perfis" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="perfis" className="gap-2">
            <Shield className="h-4 w-4" />
            Perfis
          </TabsTrigger>
          <TabsTrigger value="permissoes" className="gap-2">
            <Eye className="h-4 w-4" />
            Matriz
          </TabsTrigger>
          <TabsTrigger value="hierarquia" className="gap-2">
            <GitBranch className="h-4 w-4" />
            Hierarquia
          </TabsTrigger>
        </TabsList>

        {/* TAB 1: Perfis de Acesso */}
        <TabsContent value="perfis" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Perfis de Acesso</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar perfil..."
                      value={searchPerfil}
                      onChange={(e) => setSearchPerfil(e.target.value)}
                      className="pl-8 w-64"
                    />
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setDialogCompararPerfis(true)}>
                    <GitCompare className="h-4 w-4 mr-2" />
                    Comparar
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Perfil</TableHead>
                    <TableHead>Departamento</TableHead>
                    <TableHead className="text-center">Permissões</TableHead>
                    <TableHead className="text-center">Usuários</TableHead>
                    <TableHead>Última Alteração</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {perfisFiltrados.map((perfil) => (
                    <TableRow key={perfil.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{perfil.nome}</p>
                          <p className="text-xs text-muted-foreground">{perfil.setor}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{perfil.departamento}</Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="secondary">{perfil.permissoes}</Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline">{perfil.usuarios}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">{perfil.ultimaAlteracao}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              Ações
                              <ChevronDown className="h-4 w-4 ml-1" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setPerfilSelecionado(perfil)}>
                              <Eye className="h-4 w-4 mr-2" />
                              Ver Detalhes
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Pencil className="h-4 w-4 mr-2" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="h-4 w-4 mr-2" />
                              Clonar
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
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
            </CardContent>
          </Card>

          {/* Detalhes do Perfil Selecionado */}
          {perfilSelecionado && (
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{perfilSelecionado.nome}</CardTitle>
                    <CardDescription>{perfilSelecionado.descricao}</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setPerfilSelecionado(null)}>
                    Fechar
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Permissões */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm">Permissões</h4>
                    {perfilSelecionado.permissoesDetalhadas.map((perm, idx) => (
                      <div key={idx} className="p-3 border rounded-lg space-y-2">
                        <p className="text-sm font-medium">{perm.rotina}</p>
                        <div className="flex flex-wrap gap-1">
                          {perm.acoes.ver && (
                            <Badge variant="secondary" className="text-xs">
                              Ver
                            </Badge>
                          )}
                          {perm.acoes.criar && (
                            <Badge variant="secondary" className="text-xs">
                              Criar
                            </Badge>
                          )}
                          {perm.acoes.editar && (
                            <Badge variant="secondary" className="text-xs">
                              Editar
                            </Badge>
                          )}
                          {perm.acoes.aprovar && <Badge className="text-xs bg-amber-500">Aprovar</Badge>}
                          {perm.acoes.exportar && (
                            <Badge variant="outline" className="text-xs">
                              Exportar
                            </Badge>
                          )}
                        </div>
                        <Badge variant="outline" className="text-xs">
                          Visão: {perm.nivelVisao}
                        </Badge>
                      </div>
                    ))}
                  </div>

                  {/* Restrições e Resumo */}
                  <div className="space-y-3">
                    {perfilSelecionado.restricoes.length > 0 && (
                      <div>
                        <h4 className="font-medium text-sm mb-2">Restrições</h4>
                        <div className="flex flex-wrap gap-1">
                          {perfilSelecionado.restricoes.map((r, idx) => (
                            <Badge key={idx} variant="destructive" className="text-xs">
                              {r}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {perfilSelecionado.permissoesEspeciais && (
                      <div>
                        <h4 className="font-medium text-sm mb-2">Permissões Especiais</h4>
                        <ul className="space-y-1">
                          {perfilSelecionado.permissoesEspeciais.map((pe, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                              {pe}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertDescription className="text-sm">{perfilSelecionado.resumo}</AlertDescription>
                    </Alert>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* TAB 2: Matriz de Permissões */}
        <TabsContent value="permissoes" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Árvore de Rotinas */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Árvore de Rotinas</CardTitle>
                <CardDescription>Departamento &gt; Setor &gt; Rotina</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px] pr-4">{renderArvore(arvoreRotinas)}</ScrollArea>
              </CardContent>
            </Card>

            {/* Painel de Permissões */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Permissões da Rotina</CardTitle>
                {rotinaSelecionada ? (
                  <CardDescription>Configurando: {rotinaSelecionada}</CardDescription>
                ) : (
                  <CardDescription>Selecione uma rotina na árvore</CardDescription>
                )}
              </CardHeader>
              <CardContent>
                {rotinaSelecionada ? (
                  <div className="space-y-6">
                    {/* Seletor de Perfil */}
                    <div className="space-y-2">
                      <Label>Perfil</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um perfil" />
                        </SelectTrigger>
                        <SelectContent>
                          {perfisData.map((p) => (
                            <SelectItem key={p.id} value={p.id.toString()}>
                              {p.nome}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Ações */}
                    <div className="space-y-3">
                      <Label>Ações Permitidas</Label>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="acao-ver"
                            checked={permissoesRotina.ver}
                            onCheckedChange={(c) => setPermissoesRotina((prev) => ({ ...prev, ver: !!c }))}
                          />
                          <label htmlFor="acao-ver" className="text-sm flex items-center gap-2">
                            <Eye className="h-4 w-4 text-muted-foreground" />
                            Ver
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="acao-criar"
                            checked={permissoesRotina.criar}
                            onCheckedChange={(c) => setPermissoesRotina((prev) => ({ ...prev, criar: !!c }))}
                          />
                          <label htmlFor="acao-criar" className="text-sm flex items-center gap-2">
                            <Plus className="h-4 w-4 text-muted-foreground" />
                            Criar
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="acao-editar"
                            checked={permissoesRotina.editar}
                            onCheckedChange={(c) => setPermissoesRotina((prev) => ({ ...prev, editar: !!c }))}
                          />
                          <label htmlFor="acao-editar" className="text-sm flex items-center gap-2">
                            <FileEdit className="h-4 w-4 text-muted-foreground" />
                            Editar
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="acao-excluir"
                            checked={permissoesRotina.excluir}
                            onCheckedChange={(c) => setPermissoesRotina((prev) => ({ ...prev, excluir: !!c }))}
                          />
                          <label htmlFor="acao-excluir" className="text-sm flex items-center gap-2 text-destructive">
                            <Trash2 className="h-4 w-4" />
                            Excluir
                            <AlertTriangle className="h-3 w-3" />
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="acao-aprovar"
                            checked={permissoesRotina.aprovar}
                            onCheckedChange={(c) => setPermissoesRotina((prev) => ({ ...prev, aprovar: !!c }))}
                          />
                          <label htmlFor="acao-aprovar" className="text-sm flex items-center gap-2 text-amber-600">
                            <CheckCircle className="h-4 w-4" />
                            Aprovar
                            <AlertTriangle className="h-3 w-3" />
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="acao-cancelar"
                            checked={permissoesRotina.cancelar}
                            onCheckedChange={(c) => setPermissoesRotina((prev) => ({ ...prev, cancelar: !!c }))}
                          />
                          <label htmlFor="acao-cancelar" className="text-sm flex items-center gap-2">
                            <XCircle className="h-4 w-4 text-muted-foreground" />
                            Cancelar
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="acao-exportar"
                            checked={permissoesRotina.exportar}
                            onCheckedChange={(c) => setPermissoesRotina((prev) => ({ ...prev, exportar: !!c }))}
                          />
                          <label htmlFor="acao-exportar" className="text-sm flex items-center gap-2 text-amber-600">
                            <Download className="h-4 w-4" />
                            Exportar
                            <AlertTriangle className="h-3 w-3" />
                          </label>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Nível de Visão */}
                    <div className="space-y-3">
                      <Label>Nível de Visão</Label>
                      <RadioGroup value={nivelVisao} onValueChange={setNivelVisao} className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="MEU" id="visao-meu" />
                          <Label htmlFor="visao-meu" className="font-normal">
                            <span className="font-medium">MEU</span>
                            <span className="text-muted-foreground ml-2">- Apenas registros criados por mim</span>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="SETOR" id="visao-setor" />
                          <Label htmlFor="visao-setor" className="font-normal">
                            <span className="font-medium">SETOR</span>
                            <span className="text-muted-foreground ml-2">- Registros do meu setor</span>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="DEPARTAMENTO" id="visao-depto" />
                          <Label htmlFor="visao-depto" className="font-normal">
                            <span className="font-medium">DEPARTAMENTO</span>
                            <span className="text-muted-foreground ml-2">- Todos do departamento</span>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="EMPRESA" id="visao-empresa" />
                          <Label htmlFor="visao-empresa" className="font-normal">
                            <span className="font-medium">EMPRESA</span>
                            <span className="text-muted-foreground ml-2">- Visão global</span>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <Separator />

                    {/* Resumo em linguagem natural */}
                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertDescription>
                        <strong>O que este perfil consegue fazer:</strong>
                        <p className="mt-1 text-sm">
                          {permissoesRotina.criar && "Pode criar novos registros. "}
                          {permissoesRotina.editar && "Pode editar registros existentes. "}
                          {permissoesRotina.ver && "Pode visualizar registros. "}
                          {permissoesRotina.aprovar && "Tem poder de aprovação. "}
                          {permissoesRotina.exportar && "Pode exportar dados. "}
                          Visualiza apenas registros de nível <strong>{nivelVisao}</strong>.
                        </p>
                      </AlertDescription>
                    </Alert>

                    <div className="flex justify-end gap-2">
                      <Button variant="outline">Cancelar</Button>
                      <Button>Salvar Permissões</Button>
                    </div>
                  </div>
                ) : (
                  <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <Eye className="h-12 w-12 mx-auto mb-4 opacity-20" />
                      <p>Selecione uma rotina na árvore ao lado para configurar as permissões</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* TAB 3: Hierarquia & Aprovações */}
        <TabsContent value="hierarquia" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Governantes */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Governantes por Departamento</CardTitle>
                <CardDescription>Responsáveis máximos de cada área</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Departamento</TableHead>
                      <TableHead>Governante</TableHead>
                      <TableHead className="text-right">Ação</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {governantesData.map((gov, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="font-medium">{gov.departamento}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                              <Crown className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">{gov.governante}</p>
                              <p className="text-xs text-muted-foreground">{gov.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Organograma */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Organograma</CardTitle>
                <CardDescription>Estrutura hierárquica simplificada</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">{renderOrganograma(organograma)}</ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Regras de Aprovação */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Regras de Aprovação</CardTitle>
                  <CardDescription>Fluxos de aprovação por tipo de documento e valor</CardDescription>
                </div>
                <Button size="sm" onClick={() => setDialogCriarRegra(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Regra
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Condição</TableHead>
                    <TableHead>Aprovador</TableHead>
                    <TableHead>SLA</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {regrasAprovacao.map((regra) => (
                    <TableRow key={regra.id}>
                      <TableCell className="font-medium">{regra.tipo}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{regra.condicao}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <ArrowRight className="h-4 w-4 text-muted-foreground" />
                          {regra.aprovador}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="gap-1">
                          <Clock className="h-3 w-3" />
                          {regra.sla}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialog Simular Acesso */}
      <Dialog open={dialogSimular} onOpenChange={setDialogSimular}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Simular Acesso</DialogTitle>
            <DialogDescription>
              Selecione um usuário para visualizar os menus e rotas que ele teria acesso
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Usuário</Label>
              <Select value={usuarioSimulacao} onValueChange={setUsuarioSimulacao}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um usuário" />
                </SelectTrigger>
                <SelectContent>
                  {usuariosSimulacao.map((u) => (
                    <SelectItem key={u.id} value={u.id.toString()}>
                      {u.nome} ({u.perfil})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {usuarioSimulacao && (
              <div className="border rounded-lg p-4 space-y-3">
                <h4 className="font-medium">Menus Visíveis</h4>
                {usuarioSimulacao === "1" && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 p-2 bg-muted rounded">
                      <Users className="h-4 w-4" />
                      <span>RH</span>
                      <ChevronRight className="h-4 w-4" />
                      <span>Departamento Pessoal</span>
                      <ChevronRight className="h-4 w-4" />
                      <span className="font-medium">Cadastro de Funcionário</span>
                    </div>
                    <Alert>
                      <AlertDescription className="text-sm">
                        Este usuário vê apenas a tela "Cadastro de Funcionário" e visualiza somente os registros que ele
                        mesmo criou.
                      </AlertDescription>
                    </Alert>
                  </div>
                )}
                {usuarioSimulacao === "2" && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 p-2 bg-muted rounded">
                      <Building2 className="h-4 w-4" />
                      <span>Suprimentos</span>
                      <ChevronRight className="h-4 w-4" />
                      <span>Pedidos</span>
                      <ChevronRight className="h-4 w-4" />
                      <span className="font-medium">Pedido</span>
                    </div>
                    <Alert>
                      <AlertDescription className="text-sm">
                        Este usuário vê apenas "Pedidos" e visualiza pedidos do setor. Pedidos acima do limite seguem
                        automaticamente para aprovação.
                      </AlertDescription>
                    </Alert>
                  </div>
                )}
                {usuarioSimulacao === "3" && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 p-2 bg-muted rounded">
                      <Building2 className="h-4 w-4" />
                      <span>Comercial</span>
                      <ChevronRight className="h-4 w-4" />
                      <span className="font-medium">Propostas, Contratos, Relatórios</span>
                    </div>
                    <Alert>
                      <AlertDescription className="text-sm">
                        Este usuário é Governante do Comercial. Visualiza tudo do departamento e tem poder de aprovação.
                        Recebe todas as solicitações pendentes.
                      </AlertDescription>
                    </Alert>
                  </div>
                )}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogSimular(false)}>
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog Criar Perfil */}
      <Dialog open={dialogCriarPerfil} onOpenChange={setDialogCriarPerfil}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criar Novo Perfil</DialogTitle>
            <DialogDescription>Configure um novo perfil de acesso</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Nome do Perfil</Label>
              <Input placeholder="Ex: Financeiro – Analista" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Departamento</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rh">Recursos Humanos</SelectItem>
                    <SelectItem value="financeiro">Financeiro</SelectItem>
                    <SelectItem value="comercial">Comercial</SelectItem>
                    <SelectItem value="suprimentos">Suprimentos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Setor</Label>
                <Input placeholder="Ex: Contas a Pagar" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Descrição</Label>
              <Input placeholder="Descreva as responsabilidades deste perfil" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogCriarPerfil(false)}>
              Cancelar
            </Button>
            <Button onClick={() => setDialogCriarPerfil(false)}>Criar Perfil</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog Comparar Perfis */}
      <Dialog open={dialogCompararPerfis} onOpenChange={setDialogCompararPerfis}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Comparar Perfis</DialogTitle>
            <DialogDescription>Compare as permissões de dois perfis lado a lado</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Perfil 1</Label>
              <Select value={perfilComparar1} onValueChange={setPerfilComparar1}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {perfisData.map((p) => (
                    <SelectItem key={p.id} value={p.id.toString()}>
                      {p.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Perfil 2</Label>
              <Select value={perfilComparar2} onValueChange={setPerfilComparar2}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {perfisData.map((p) => (
                    <SelectItem key={p.id} value={p.id.toString()}>
                      {p.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          {perfilComparar1 && perfilComparar2 && (
            <div className="border rounded-lg p-4 mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Aspecto</TableHead>
                    <TableHead>{perfisData.find((p) => p.id.toString() === perfilComparar1)?.nome}</TableHead>
                    <TableHead>{perfisData.find((p) => p.id.toString() === perfilComparar2)?.nome}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Departamento</TableCell>
                    <TableCell>{perfisData.find((p) => p.id.toString() === perfilComparar1)?.departamento}</TableCell>
                    <TableCell>{perfisData.find((p) => p.id.toString() === perfilComparar2)?.departamento}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Permissões</TableCell>
                    <TableCell>{perfisData.find((p) => p.id.toString() === perfilComparar1)?.permissoes}</TableCell>
                    <TableCell>{perfisData.find((p) => p.id.toString() === perfilComparar2)?.permissoes}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Usuários</TableCell>
                    <TableCell>{perfisData.find((p) => p.id.toString() === perfilComparar1)?.usuarios}</TableCell>
                    <TableCell>{perfisData.find((p) => p.id.toString() === perfilComparar2)?.usuarios}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogCompararPerfis(false)}>
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog Criar Regra */}
      <Dialog open={dialogCriarRegra} onOpenChange={setDialogCriarRegra}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nova Regra de Aprovação</DialogTitle>
            <DialogDescription>Configure uma nova regra de fluxo de aprovação</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Tipo de Documento</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pedido">Pedido de Compra</SelectItem>
                  <SelectItem value="contrato">Contrato Comercial</SelectItem>
                  <SelectItem value="pagamento">Solicitação de Pagamento</SelectItem>
                  <SelectItem value="admissao">Admissão de Funcionário</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Condição</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ate5k">Até R$ 5.000</SelectItem>
                    <SelectItem value="5k50k">De R$ 5.001 até R$ 50.000</SelectItem>
                    <SelectItem value="acima50k">Acima de R$ 50.000</SelectItem>
                    <SelectItem value="qualquer">Qualquer valor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>SLA</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="24h">24 horas</SelectItem>
                    <SelectItem value="48h">48 horas</SelectItem>
                    <SelectItem value="72h">72 horas</SelectItem>
                    <SelectItem value="7d">7 dias</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Aprovador</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gestor">Gestor Direto</SelectItem>
                  <SelectItem value="governante">Governante do Departamento</SelectItem>
                  <SelectItem value="diretoria">Diretoria</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogCriarRegra(false)}>
              Cancelar
            </Button>
            <Button onClick={() => setDialogCriarRegra(false)}>Criar Regra</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
        </div>
      </main>
    </div>
  )
}
