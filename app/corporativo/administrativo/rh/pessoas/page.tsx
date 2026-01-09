"use client"

import { useState, Suspense } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { RHNav } from "@/components/rh/rh-nav"
import {
  Plus,
  Search,
  Users,
  UserCheck,
  Download,
  MoreHorizontal,
  Eye,
  AlertTriangle,
  Scale,
  ChevronRight,
  Edit,
  Lock,
  UserMinus,
  History,
  Briefcase,
  Gift,
  Award,
} from "lucide-react"

// ============================================
// DADOS MOCKADOS - COLABORADORES CORPORATIVO
// ============================================

const colaboradoresMock = [
  {
    id: "CLT-C001",
    matricula: "CLT-C001",
    nome: "Ana Paula Ribeiro",
    cpf: "111.222.333-44",
    funcao: "Analista de RH",
    setor: "Recursos Humanos",
    vinculo: "CLT",
    efetivo: "Indireto",
    status: "Ativo",
    docStatus: "OK",
    riscoJuridico: false,
    feriasVencer: null,
    asoVencer: null,
  },
  {
    id: "CLT-C002",
    matricula: "CLT-C002",
    nome: "Ricardo Mendes",
    cpf: "222.333.444-55",
    funcao: "Gerente Financeiro",
    setor: "Financeiro",
    vinculo: "CLT",
    efetivo: "Indireto",
    status: "Ativo",
    docStatus: "OK",
    riscoJuridico: false,
    feriasVencer: "30/01/2026",
    asoVencer: null,
  },
  {
    id: "CLT-C003",
    matricula: "CLT-C003",
    nome: "Fernanda Costa",
    cpf: "333.444.555-66",
    funcao: "Assistente Administrativo",
    setor: "Administrativo",
    vinculo: "CLT",
    efetivo: "Indireto",
    status: "Ativo",
    docStatus: "Pendente",
    riscoJuridico: true,
    feriasVencer: null,
    asoVencer: "10/01/2026",
  },
  {
    id: "PJ-C001",
    matricula: "PJ-C001",
    nome: "Carlos Eduardo Silva",
    cpf: "444.555.666-77",
    funcao: "Consultor Juridico",
    setor: "Juridico",
    vinculo: "PJ",
    efetivo: "Indireto",
    status: "Ativo",
    docStatus: "OK",
    riscoJuridico: false,
    feriasVencer: null,
    asoVencer: null,
  },
  {
    id: "CLT-C004",
    matricula: "CLT-C004",
    nome: "Patricia Almeida",
    cpf: "555.666.777-88",
    funcao: "Diretora Administrativa",
    setor: "Diretoria",
    vinculo: "CLT",
    efetivo: "Indireto",
    status: "Ativo",
    docStatus: "OK",
    riscoJuridico: false,
    feriasVencer: null,
    asoVencer: null,
  },
]

// ============================================
// DADOS MOCKADOS - CARGOS CORPORATIVO
// ============================================

const cargosMock = [
  {
    id: 1,
    cargo: "Analista de RH",
    cbo: "2524-05",
    classificacao: "Mensalista",
    natureza: "Indireto",
    faixaMin: 4500,
    faixaMax: 7500,
    qtdColaboradores: 3,
    elegivel: { vr: true, vt: true, planoSaude: true, plr: true },
  },
  {
    id: 2,
    cargo: "Gerente Financeiro",
    cbo: "1421-05",
    classificacao: "Mensalista",
    natureza: "Indireto",
    faixaMin: 12000,
    faixaMax: 18000,
    qtdColaboradores: 1,
    elegivel: { vr: true, vt: false, planoSaude: true, plr: true },
  },
  {
    id: 3,
    cargo: "Assistente Administrativo",
    cbo: "4110-10",
    classificacao: "Mensalista",
    natureza: "Indireto",
    faixaMin: 2500,
    faixaMax: 4000,
    qtdColaboradores: 5,
    elegivel: { vr: true, vt: true, planoSaude: true, plr: false },
  },
  {
    id: 4,
    cargo: "Diretor Administrativo",
    cbo: "1210-05",
    classificacao: "Mensalista",
    natureza: "Indireto",
    faixaMin: 25000,
    faixaMax: 40000,
    qtdColaboradores: 1,
    elegivel: { vr: false, vt: false, planoSaude: true, plr: true },
  },
  {
    id: 5,
    cargo: "Consultor Juridico",
    cbo: "2410-05",
    classificacao: "Mensalista",
    natureza: "Indireto",
    faixaMin: 15000,
    faixaMax: 25000,
    qtdColaboradores: 2,
    elegivel: { vr: false, vt: false, planoSaude: false, plr: false },
  },
]

// ============================================
// DADOS MOCKADOS - BENEFICIOS CORPORATIVO
// ============================================

const beneficiosMock = [
  {
    id: 1,
    tipo: "Vale Refeicao",
    operadora: "Sodexo",
    valorUnitario: 35.0,
    colaboradores: 12,
    custoMensal: 9240.0,
    status: "Ativo",
  },
  {
    id: 2,
    tipo: "Vale Transporte",
    operadora: "SPTrans",
    valorUnitario: 220.0,
    colaboradores: 8,
    custoMensal: 1760.0,
    status: "Ativo",
  },
  {
    id: 3,
    tipo: "Plano de Saude",
    operadora: "Unimed",
    valorUnitario: 850.0,
    colaboradores: 15,
    custoMensal: 12750.0,
    status: "Ativo",
  },
  {
    id: 4,
    tipo: "Seguro de Vida",
    operadora: "Porto Seguro",
    valorUnitario: 45.0,
    colaboradores: 15,
    custoMensal: 675.0,
    status: "Ativo",
  },
]

// ============================================
// DADOS MOCKADOS - PREMIOS CORPORATIVO
// ============================================

const premiosMock = [
  {
    id: 1,
    nome: "Bonus Anual",
    tipo: "PLR",
    natureza: "Nao-Salarial",
    valor: 5000.0,
    elegibilidade: "Todos CLT",
    recorrencia: "Anual",
    status: "Ativo",
  },
  {
    id: 2,
    nome: "Premiacao por Meta",
    tipo: "Premiacao",
    natureza: "Nao-Salarial",
    valor: 1500.0,
    elegibilidade: "Gerentes",
    recorrencia: "Trimestral",
    status: "Ativo",
  },
]

function PessoasContent() {
  const [activeTab, setActiveTab] = useState("colaboradores")
  const [searchTerm, setSearchTerm] = useState("")
  const [filtroVinculo, setFiltroVinculo] = useState("todos")
  const [filtroStatus, setFiltroStatus] = useState("todos")
  const [selectedColaboradores, setSelectedColaboradores] = useState<string[]>([])
  const [desligamentoDialog, setDesligamentoDialog] = useState(false)
  const [desligamentoLote, setDesligamentoLote] = useState(false)
  const [colaboradorSelecionado, setColaboradorSelecionado] = useState<any>(null)
  const [novoColaboradorDialog, setNovoColaboradorDialog] = useState(false)

  // Filtrar colaboradores
  const colaboradoresFiltrados = colaboradoresMock.filter((c) => {
    const matchSearch =
      c.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.matricula.toLowerCase().includes(searchTerm.toLowerCase())
    const matchVinculo = filtroVinculo === "todos" || c.vinculo === filtroVinculo
    const matchStatus = filtroStatus === "todos" || c.status === filtroStatus
    return matchSearch && matchVinculo && matchStatus
  })

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedColaboradores(colaboradoresFiltrados.map((c) => c.id))
    } else {
      setSelectedColaboradores([])
    }
  }

  const handleSelectOne = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedColaboradores([...selectedColaboradores, id])
    } else {
      setSelectedColaboradores(selectedColaboradores.filter((i) => i !== id))
    }
  }

  // Calculos
  const totalColaboradores = colaboradoresMock.length
  const totalAtivos = colaboradoresMock.filter((c) => c.status === "Ativo").length
  const totalPendencias = colaboradoresMock.filter((c) => c.docStatus === "Pendente").length
  const totalRisco = colaboradoresMock.filter((c) => c.riscoJuridico).length

  return (
    <div className="space-y-6">
      {/* Cards Operacionais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="cursor-pointer hover:border-primary transition-colors">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Efetivo</p>
                <p className="text-2xl font-bold">{totalColaboradores}</p>
                <div className="flex gap-2 mt-1">
                  <span className="text-xs text-muted-foreground">
                    CLT: {colaboradoresMock.filter((c) => c.vinculo === "CLT").length}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    PJ: {colaboradoresMock.filter((c) => c.vinculo === "PJ").length}
                  </span>
                </div>
              </div>
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:border-primary transition-colors">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Status Operacional</p>
                <p className="text-2xl font-bold text-green-600">{totalAtivos}</p>
                <div className="flex gap-2 mt-1">
                  <span className="text-xs text-muted-foreground">Afastados: 0</span>
                  <span className="text-xs text-muted-foreground">Bloqueados: 0</span>
                </div>
              </div>
              <UserCheck className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:border-primary transition-colors">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pendencias</p>
                <p className="text-2xl font-bold text-amber-600">{totalPendencias}</p>
                <div className="flex gap-2 mt-1">
                  <span className="text-xs text-muted-foreground">Docs: {totalPendencias}</span>
                  <span className="text-xs text-muted-foreground">ASO: 1</span>
                </div>
              </div>
              <AlertTriangle className="h-8 w-8 text-amber-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:border-primary transition-colors border-red-200">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Risco Juridico</p>
                <p className="text-2xl font-bold text-red-600">{totalRisco}</p>
                <div className="flex gap-2 mt-1">
                  <Badge variant="destructive" className="text-xs">
                    <Scale className="h-3 w-3 mr-1" />
                    Atencao
                  </Badge>
                </div>
              </div>
              <Scale className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subnavegacao - Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="colaboradores">
            <Users className="h-4 w-4 mr-2" />
            Colaboradores
          </TabsTrigger>
          <TabsTrigger value="cargos">
            <Briefcase className="h-4 w-4 mr-2" />
            Cargos & Salarios
          </TabsTrigger>
          <TabsTrigger value="beneficios">
            <Gift className="h-4 w-4 mr-2" />
            Encargos & Beneficios
          </TabsTrigger>
          <TabsTrigger value="premios">
            <Award className="h-4 w-4 mr-2" />
            Premios & Bonificacoes
          </TabsTrigger>
        </TabsList>

        {/* Tab Colaboradores */}
        <TabsContent value="colaboradores" className="space-y-4">
          {/* Acoes e Filtros */}
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="flex gap-2 flex-1">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome ou matricula..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={filtroVinculo} onValueChange={setFiltroVinculo}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Vinculo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="CLT">CLT</SelectItem>
                  <SelectItem value="PJ">PJ</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filtroStatus} onValueChange={setFiltroStatus}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="Ativo">Ativo</SelectItem>
                  <SelectItem value="Afastado">Afastado</SelectItem>
                  <SelectItem value="Bloqueado">Bloqueado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              {selectedColaboradores.length > 0 && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    setDesligamentoLote(true)
                    setDesligamentoDialog(true)
                  }}
                >
                  <UserMinus className="h-4 w-4 mr-2" />
                  Desligar Selecionados ({selectedColaboradores.length})
                </Button>
              )}
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
              <Button size="sm" onClick={() => setNovoColaboradorDialog(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Novo Colaborador
              </Button>
            </div>
          </div>

          {/* Tabela de Colaboradores */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={
                          selectedColaboradores.length === colaboradoresFiltrados.length &&
                          colaboradoresFiltrados.length > 0
                        }
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                    <TableHead>Matricula</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Funcao</TableHead>
                    <TableHead>Setor</TableHead>
                    <TableHead>Vinculo</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Docs</TableHead>
                    <TableHead className="text-right">Acoes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {colaboradoresFiltrados.map((colaborador) => (
                    <TableRow key={colaborador.id} className={colaborador.riscoJuridico ? "bg-red-50" : ""}>
                      <TableCell>
                        <Checkbox
                          checked={selectedColaboradores.includes(colaborador.id)}
                          onCheckedChange={(checked) => handleSelectOne(colaborador.id, checked as boolean)}
                        />
                      </TableCell>
                      <TableCell className="font-mono text-sm">{colaborador.matricula}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {colaborador.nome}
                          {colaborador.riscoJuridico && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <Scale className="h-4 w-4 text-red-500" />
                                </TooltipTrigger>
                                <TooltipContent>Risco juridico identificado</TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{colaborador.funcao}</TableCell>
                      <TableCell>{colaborador.setor}</TableCell>
                      <TableCell>
                        <Badge variant={colaborador.vinculo === "CLT" ? "default" : "secondary"}>
                          {colaborador.vinculo}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={colaborador.status === "Ativo" ? "default" : "destructive"}>
                          {colaborador.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={colaborador.docStatus === "OK" ? "default" : "destructive"}>
                          {colaborador.docStatus}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/corporativo/administrativo/rh/colaborador/${colaborador.id}`}>
                                <Eye className="h-4 w-4 mr-2" />
                                Prontuario
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Lock className="h-4 w-4 mr-2" />
                              Bloquear
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => {
                                setColaboradorSelecionado(colaborador)
                                setDesligamentoLote(false)
                                setDesligamentoDialog(true)
                              }}
                            >
                              <UserMinus className="h-4 w-4 mr-2" />
                              Desligamento
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <History className="h-4 w-4 mr-2" />
                              Historico
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
        </TabsContent>

        {/* Tab Cargos */}
        <TabsContent value="cargos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Estrutura de Cargos - Corporativo</CardTitle>
              <CardDescription>Cargos e faixas salariais do escritorio central</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cargo</TableHead>
                    <TableHead>CBO</TableHead>
                    <TableHead>Classificacao</TableHead>
                    <TableHead>Faixa Salarial</TableHead>
                    <TableHead>Qtd</TableHead>
                    <TableHead>Elegibilidade</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cargosMock.map((cargo) => (
                    <TableRow key={cargo.id}>
                      <TableCell className="font-medium">{cargo.cargo}</TableCell>
                      <TableCell className="font-mono text-sm">{cargo.cbo}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{cargo.classificacao}</Badge>
                      </TableCell>
                      <TableCell>
                        R$ {cargo.faixaMin.toLocaleString()} - R$ {cargo.faixaMax.toLocaleString()}
                      </TableCell>
                      <TableCell>{cargo.qtdColaboradores}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {cargo.elegivel.vr && (
                            <Badge variant="secondary" className="text-xs">
                              VR
                            </Badge>
                          )}
                          {cargo.elegivel.vt && (
                            <Badge variant="secondary" className="text-xs">
                              VT
                            </Badge>
                          )}
                          {cargo.elegivel.planoSaude && (
                            <Badge variant="secondary" className="text-xs">
                              Saude
                            </Badge>
                          )}
                          {cargo.elegivel.plr && (
                            <Badge variant="secondary" className="text-xs">
                              PLR
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Beneficios */}
        <TabsContent value="beneficios" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Beneficios - Corporativo</CardTitle>
              <CardDescription>Gestao de beneficios do escritorio central</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Operadora</TableHead>
                    <TableHead>Valor Unit.</TableHead>
                    <TableHead>Colaboradores</TableHead>
                    <TableHead>Custo Mensal</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {beneficiosMock.map((beneficio) => (
                    <TableRow key={beneficio.id}>
                      <TableCell className="font-medium">{beneficio.tipo}</TableCell>
                      <TableCell>{beneficio.operadora}</TableCell>
                      <TableCell>R$ {beneficio.valorUnitario.toFixed(2)}</TableCell>
                      <TableCell>{beneficio.colaboradores}</TableCell>
                      <TableCell className="font-medium">R$ {beneficio.custoMensal.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant="default">{beneficio.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <div className="flex justify-between w-full">
                <span className="text-sm text-muted-foreground">Total Mensal Beneficios</span>
                <span className="font-bold">
                  R$ {beneficiosMock.reduce((acc, b) => acc + b.custoMensal, 0).toLocaleString()}
                </span>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Tab Premios */}
        <TabsContent value="premios" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Premios & Bonificacoes - Corporativo</CardTitle>
              <CardDescription>Programas de incentivo do escritorio central</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Natureza</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Elegibilidade</TableHead>
                    <TableHead>Recorrencia</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {premiosMock.map((premio) => (
                    <TableRow key={premio.id}>
                      <TableCell className="font-medium">{premio.nome}</TableCell>
                      <TableCell>{premio.tipo}</TableCell>
                      <TableCell>
                        <Badge variant={premio.natureza === "Nao-Salarial" ? "secondary" : "destructive"}>
                          {premio.natureza}
                        </Badge>
                      </TableCell>
                      <TableCell>R$ {premio.valor.toLocaleString()}</TableCell>
                      <TableCell>{premio.elegibilidade}</TableCell>
                      <TableCell>{premio.recorrencia}</TableCell>
                      <TableCell>
                        <Badge variant="default">{premio.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialog Novo Colaborador */}
      <Dialog open={novoColaboradorDialog} onOpenChange={setNovoColaboradorDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Novo Colaborador - Corporativo</DialogTitle>
            <DialogDescription>Cadastre um novo colaborador do escritorio central</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label>Nome Completo *</Label>
              <Input placeholder="Nome do colaborador" />
            </div>
            <div className="space-y-2">
              <Label>CPF *</Label>
              <Input placeholder="000.000.000-00" />
            </div>
            <div className="space-y-2">
              <Label>Cargo *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o cargo" />
                </SelectTrigger>
                <SelectContent>
                  {cargosMock.map((c) => (
                    <SelectItem key={c.id} value={c.cargo}>
                      {c.cargo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Setor *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o setor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rh">Recursos Humanos</SelectItem>
                  <SelectItem value="financeiro">Financeiro</SelectItem>
                  <SelectItem value="administrativo">Administrativo</SelectItem>
                  <SelectItem value="juridico">Juridico</SelectItem>
                  <SelectItem value="diretoria">Diretoria</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Vinculo *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Tipo de vinculo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CLT">CLT</SelectItem>
                  <SelectItem value="PJ">PJ</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Data Admissao *</Label>
              <Input type="date" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNovoColaboradorDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={() => setNovoColaboradorDialog(false)}>Cadastrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog Desligamento */}
      <Dialog open={desligamentoDialog} onOpenChange={setDesligamentoDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {desligamentoLote
                ? `Desligamento em Lote (${selectedColaboradores.length})`
                : "Desligamento de Colaborador"}
            </DialogTitle>
            <DialogDescription>
              {desligamentoLote
                ? "Voce esta prestes a desligar multiplos colaboradores"
                : `Desligamento de ${colaboradorSelecionado?.nome}`}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Tipo de Desligamento *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="demissao_sem_justa_causa">Demissao sem Justa Causa</SelectItem>
                  <SelectItem value="demissao_justa_causa">Demissao por Justa Causa</SelectItem>
                  <SelectItem value="pedido_demissao">Pedido de Demissao</SelectItem>
                  <SelectItem value="acordo">Acordo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Data do Desligamento *</Label>
              <Input type="date" />
            </div>
            <div className="space-y-2">
              <Label>Justificativa *</Label>
              <Textarea placeholder="Descreva o motivo do desligamento..." rows={3} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDesligamentoDialog(false)}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                setDesligamentoDialog(false)
                setSelectedColaboradores([])
              }}
            >
              Confirmar Desligamento
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default function PessoasCorporativoPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <RHNav modulo="corporativo" />
      <main className="flex-1 container py-6">
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Link href="/corporativo" className="hover:text-foreground">
              Corporativo
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/corporativo/administrativo" className="hover:text-foreground">
              Administrativo
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/corporativo/administrativo/rh" className="hover:text-foreground">
              RH
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Pessoas</span>
          </div>
          <h1 className="text-2xl font-bold">Pessoas - Corporativo</h1>
          <p className="text-muted-foreground">Gestao de colaboradores do escritorio central</p>
        </div>
        <Suspense fallback={<div>Carregando...</div>}>
          <PessoasContent />
        </Suspense>
      </main>
    </div>
  )
}
