"use client"

import { Suspense, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { InfoTooltip } from "@/components/ui/info-tooltip"
import {
  Users,
  Shield,
  Key,
  LayoutGrid,
  Search,
  Plus,
  Eye,
  Edit,
  Lock,
  Unlock,
  RotateCcw,
  History,
  Filter,
} from "lucide-react"

// Mock data - Usuarios
const usuariosMock = [
  {
    id: 1,
    nome: "Carlos Silva",
    email: "carlos.silva@empresa.com",
    status: "ativo",
    perfil: "Gerente de Obra",
    setor: "Engenharia",
    departamento: "Producao",
    alcadaMax: "R$ 500.000",
    ultimoAcesso: "07/01/2026 08:45",
  },
  {
    id: 2,
    nome: "Ana Souza",
    email: "ana.souza@empresa.com",
    status: "ativo",
    perfil: "Diretor Comercial",
    setor: "Comercial",
    departamento: "Vendas",
    alcadaMax: "R$ 2.000.000",
    ultimoAcesso: "07/01/2026 09:12",
  },
  {
    id: 3,
    nome: "Pedro Santos",
    email: "pedro.santos@empresa.com",
    status: "bloqueado",
    perfil: "Analista Financeiro",
    setor: "Financeiro",
    departamento: "Contas a Pagar",
    alcadaMax: "R$ 50.000",
    ultimoAcesso: "03/01/2026 14:30",
  },
  {
    id: 4,
    nome: "Maria Oliveira",
    email: "maria.oliveira@empresa.com",
    status: "ativo",
    perfil: "Coordenador RH",
    setor: "RH",
    departamento: "Gestao de Pessoas",
    alcadaMax: "R$ 100.000",
    ultimoAcesso: "06/01/2026 17:55",
  },
  {
    id: 5,
    nome: "Jose Pereira",
    email: "jose.pereira@empresa.com",
    status: "pendente",
    perfil: "Engenheiro",
    setor: "Engenharia",
    departamento: "Planejamento",
    alcadaMax: "R$ 200.000",
    ultimoAcesso: "Nunca",
  },
  {
    id: 6,
    nome: "Lucia Costa",
    email: "lucia.costa@empresa.com",
    status: "ativo",
    perfil: "Superintendente",
    setor: "Diretoria",
    departamento: "Operacoes",
    alcadaMax: "R$ 5.000.000",
    ultimoAcesso: "07/01/2026 07:30",
  },
]

// Mock data - Perfis
const perfisMock = [
  {
    id: 1,
    nome: "Superintendente",
    descricao: "Acesso total ao sistema",
    usuarios: 2,
    permissoes: 45,
    status: "ativo",
    nivel: 1,
  },
  {
    id: 2,
    nome: "Diretor",
    descricao: "Acesso a nivel diretoria",
    usuarios: 4,
    permissoes: 38,
    status: "ativo",
    nivel: 2,
  },
  {
    id: 3,
    nome: "Gerente de Obra",
    descricao: "Gestao completa da obra",
    usuarios: 8,
    permissoes: 32,
    status: "ativo",
    nivel: 3,
  },
  {
    id: 4,
    nome: "Coordenador",
    descricao: "Coordenacao de equipes",
    usuarios: 12,
    permissoes: 25,
    status: "ativo",
    nivel: 4,
  },
  {
    id: 5,
    nome: "Analista Senior",
    descricao: "Analise e relatorios avancados",
    usuarios: 18,
    permissoes: 18,
    status: "ativo",
    nivel: 5,
  },
  {
    id: 6,
    nome: "Analista",
    descricao: "Operacoes do dia a dia",
    usuarios: 45,
    permissoes: 12,
    status: "ativo",
    nivel: 6,
  },
  {
    id: 7,
    nome: "Assistente",
    descricao: "Suporte operacional",
    usuarios: 32,
    permissoes: 8,
    status: "ativo",
    nivel: 7,
  },
  {
    id: 8,
    nome: "Visitante",
    descricao: "Acesso somente leitura",
    usuarios: 5,
    permissoes: 3,
    status: "ativo",
    nivel: 8,
  },
]

// Mock data - Permissoes
const permissoesMock = [
  {
    id: 1,
    codigo: "OBRA_VIEW",
    nome: "Visualizar Obra",
    modulo: "Obras",
    descricao: "Permite visualizar dados da obra",
    perfis: ["Todos"],
  },
  {
    id: 2,
    codigo: "OBRA_EDIT",
    nome: "Editar Obra",
    modulo: "Obras",
    descricao: "Permite editar configuracoes da obra",
    perfis: ["Superintendente", "Diretor", "Gerente"],
  },
  {
    id: 3,
    codigo: "CUSTO_VIEW",
    nome: "Visualizar Custos",
    modulo: "Comercial",
    descricao: "Permite visualizar dados de custo",
    perfis: ["Todos"],
  },
  {
    id: 4,
    codigo: "CUSTO_EDIT",
    nome: "Editar Custos",
    modulo: "Comercial",
    descricao: "Permite editar EAP e custos",
    perfis: ["Superintendente", "Diretor", "Gerente", "Coordenador"],
  },
  {
    id: 5,
    codigo: "CUSTO_APPROVE",
    nome: "Aprovar Custos",
    modulo: "Comercial",
    descricao: "Permite aprovar alteracoes de custo",
    perfis: ["Superintendente", "Diretor"],
  },
  {
    id: 6,
    codigo: "RH_VIEW",
    nome: "Visualizar RH",
    modulo: "RH",
    descricao: "Permite visualizar dados de RH",
    perfis: ["Todos"],
  },
  {
    id: 7,
    codigo: "RH_EDIT",
    nome: "Editar RH",
    modulo: "RH",
    descricao: "Permite editar dados de colaboradores",
    perfis: ["Superintendente", "Diretor", "Coordenador RH"],
  },
  {
    id: 8,
    codigo: "FIN_VIEW",
    nome: "Visualizar Financeiro",
    modulo: "Financeiro",
    descricao: "Permite visualizar dados financeiros",
    perfis: ["Todos"],
  },
  {
    id: 9,
    codigo: "FIN_PAY",
    nome: "Autorizar Pagamentos",
    modulo: "Financeiro",
    descricao: "Permite autorizar pagamentos",
    perfis: ["Superintendente", "Diretor", "Gerente"],
  },
  {
    id: 10,
    codigo: "ADMIN_USERS",
    nome: "Administrar Usuarios",
    modulo: "Sistema",
    descricao: "Permite criar e editar usuarios",
    perfis: ["Superintendente"],
  },
]

// Mock data - Matriz
const matrizMock = [
  {
    perfil: "Superintendente",
    obras: "CRUD",
    comercial: "CRUD+A",
    financeiro: "CRUD+A",
    rh: "CRUD",
    producao: "CRUD",
    planejamento: "CRUD",
    admin: "CRUD",
  },
  {
    perfil: "Diretor",
    obras: "CRU",
    comercial: "CRU+A",
    financeiro: "CRU+A",
    rh: "CRU",
    producao: "CRU",
    planejamento: "CRU",
    admin: "R",
  },
  {
    perfil: "Gerente de Obra",
    obras: "CRU",
    comercial: "CRU",
    financeiro: "RU",
    rh: "RU",
    producao: "CRU",
    planejamento: "CRU",
    admin: "-",
  },
  {
    perfil: "Coordenador",
    obras: "RU",
    comercial: "RU",
    financeiro: "R",
    rh: "RU",
    producao: "RU",
    planejamento: "RU",
    admin: "-",
  },
  {
    perfil: "Analista Senior",
    obras: "RU",
    comercial: "RU",
    financeiro: "R",
    rh: "R",
    producao: "RU",
    planejamento: "RU",
    admin: "-",
  },
  {
    perfil: "Analista",
    obras: "R",
    comercial: "R",
    financeiro: "R",
    rh: "R",
    producao: "RU",
    planejamento: "R",
    admin: "-",
  },
  {
    perfil: "Assistente",
    obras: "R",
    comercial: "R",
    financeiro: "-",
    rh: "R",
    producao: "R",
    planejamento: "R",
    admin: "-",
  },
  {
    perfil: "Visitante",
    obras: "R",
    comercial: "-",
    financeiro: "-",
    rh: "-",
    producao: "R",
    planejamento: "R",
    admin: "-",
  },
]

function IAMContent() {
  const [abaAtiva, setAbaAtiva] = useState("usuarios")
  const [busca, setBusca] = useState("")

  const usuariosAtivos = usuariosMock.filter((u) => u.status === "ativo").length
  const usuariosBloqueados = usuariosMock.filter((u) => u.status === "bloqueado").length
  const totalPerfis = perfisMock.length
  const totalPermissoes = permissoesMock.length

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ativo":
        return <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">Ativo</Badge>
      case "bloqueado":
        return <Badge className="bg-red-500/10 text-red-500 hover:bg-red-500/20">Bloqueado</Badge>
      case "pendente":
        return <Badge className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20">Pendente</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getCRUDBadge = (crud: string) => {
    if (crud === "-") return <span className="text-muted-foreground">-</span>
    const colors: Record<string, string> = {
      "CRUD+A": "bg-purple-500/10 text-purple-500",
      CRUD: "bg-green-500/10 text-green-500",
      "CRU+A": "bg-blue-500/10 text-blue-500",
      CRU: "bg-blue-500/10 text-blue-500",
      RU: "bg-yellow-500/10 text-yellow-500",
      R: "bg-gray-500/10 text-gray-500",
    }
    return <Badge className={colors[crud] || "bg-gray-500/10"}>{crud}</Badge>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">IAM & Matriz de Perfis</h1>
            <p className="text-sm text-muted-foreground">CO-EST-02 - Gestao de Identidade e Acessos</p>
          </div>
          <InfoTooltip
            title="IAM & Matriz de Perfis"
            description="Gerenciamento centralizado de usuarios, perfis, permissoes e matriz de acessos do sistema."
          />
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Usuarios Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-green-500" />
              <span className="text-2xl font-bold">{usuariosAtivos}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Usuarios Bloqueados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-red-500" />
              <span className="text-2xl font-bold">{usuariosBloqueados}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Perfis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-500" />
              <span className="text-2xl font-bold">{totalPerfis}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Permissoes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Key className="w-5 h-5 text-purple-500" />
              <span className="text-2xl font-bold">{totalPermissoes}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={abaAtiva} onValueChange={setAbaAtiva}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="usuarios" className="flex items-center gap-2">
            <Users className="w-4 h-4" /> Usuarios
          </TabsTrigger>
          <TabsTrigger value="perfis" className="flex items-center gap-2">
            <Shield className="w-4 h-4" /> Perfis
          </TabsTrigger>
          <TabsTrigger value="permissoes" className="flex items-center gap-2">
            <Key className="w-4 h-4" /> Permissoes
          </TabsTrigger>
          <TabsTrigger value="matriz" className="flex items-center gap-2">
            <LayoutGrid className="w-4 h-4" /> Matriz Geral
          </TabsTrigger>
        </TabsList>

        {/* Tab Usuarios */}
        <TabsContent value="usuarios" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Usuarios do Sistema</CardTitle>
                  <CardDescription>Gerenciamento de usuarios e seus acessos</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar usuario..."
                      className="pl-9 w-64"
                      value={busca}
                      onChange={(e) => setBusca(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="w-4 h-4" />
                  </Button>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" /> Novo Usuario
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Perfil</TableHead>
                    <TableHead>Setor</TableHead>
                    <TableHead>Alcada Max.</TableHead>
                    <TableHead>Ultimo Acesso</TableHead>
                    <TableHead className="text-right">Acoes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {usuariosMock
                    .filter(
                      (u) =>
                        u.nome.toLowerCase().includes(busca.toLowerCase()) ||
                        u.email.toLowerCase().includes(busca.toLowerCase()),
                    )
                    .map((usuario) => (
                      <TableRow key={usuario.id}>
                        <TableCell className="font-medium">{usuario.nome}</TableCell>
                        <TableCell>{usuario.email}</TableCell>
                        <TableCell>{getStatusBadge(usuario.status)}</TableCell>
                        <TableCell>{usuario.perfil}</TableCell>
                        <TableCell>{usuario.setor}</TableCell>
                        <TableCell>{usuario.alcadaMax}</TableCell>
                        <TableCell>{usuario.ultimoAcesso}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="icon" title="Visualizar">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" title="Editar">
                              <Edit className="w-4 h-4" />
                            </Button>
                            {usuario.status === "ativo" ? (
                              <Button variant="ghost" size="icon" title="Bloquear">
                                <Lock className="w-4 h-4 text-red-500" />
                              </Button>
                            ) : (
                              <Button variant="ghost" size="icon" title="Desbloquear">
                                <Unlock className="w-4 h-4 text-green-500" />
                              </Button>
                            )}
                            <Button variant="ghost" size="icon" title="Resetar Senha">
                              <RotateCcw className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" title="Historico">
                              <History className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Perfis */}
        <TabsContent value="perfis" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Perfis de Acesso</CardTitle>
                  <CardDescription>Configuracao de perfis e niveis de acesso</CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" /> Novo Perfil
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nivel</TableHead>
                    <TableHead>Nome do Perfil</TableHead>
                    <TableHead>Descricao</TableHead>
                    <TableHead className="text-center">Usuarios</TableHead>
                    <TableHead className="text-center">Permissoes</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Acoes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {perfisMock.map((perfil) => (
                    <TableRow key={perfil.id}>
                      <TableCell>
                        <Badge variant="outline">{perfil.nivel}</Badge>
                      </TableCell>
                      <TableCell className="font-medium">{perfil.nome}</TableCell>
                      <TableCell className="text-muted-foreground">{perfil.descricao}</TableCell>
                      <TableCell className="text-center">{perfil.usuarios}</TableCell>
                      <TableCell className="text-center">{perfil.permissoes}</TableCell>
                      <TableCell>{getStatusBadge(perfil.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Permissoes */}
        <TabsContent value="permissoes" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Permissoes do Sistema</CardTitle>
                  <CardDescription>Catalogo de permissoes disponiveis</CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" /> Nova Permissao
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Codigo</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Modulo</TableHead>
                    <TableHead>Descricao</TableHead>
                    <TableHead>Perfis com Acesso</TableHead>
                    <TableHead className="text-right">Acoes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {permissoesMock.map((perm) => (
                    <TableRow key={perm.id}>
                      <TableCell>
                        <code className="text-xs bg-muted px-2 py-1 rounded">{perm.codigo}</code>
                      </TableCell>
                      <TableCell className="font-medium">{perm.nome}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{perm.modulo}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{perm.descricao}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {perm.perfis.slice(0, 3).map((p, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {p}
                            </Badge>
                          ))}
                          {perm.perfis.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{perm.perfis.length - 3}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Matriz */}
        <TabsContent value="matriz" className="space-y-4">
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Matriz de Acessos</CardTitle>
                <CardDescription>Visao consolidada de permissoes por perfil e modulo</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex items-center gap-4 text-sm">
                <span className="text-muted-foreground">Legenda:</span>
                <div className="flex items-center gap-1">
                  <Badge className="bg-purple-500/10 text-purple-500">CRUD+A</Badge> Completo + Aprovar
                </div>
                <div className="flex items-center gap-1">
                  <Badge className="bg-green-500/10 text-green-500">CRUD</Badge> Completo
                </div>
                <div className="flex items-center gap-1">
                  <Badge className="bg-blue-500/10 text-blue-500">CRU</Badge> Criar/Ler/Atualizar
                </div>
                <div className="flex items-center gap-1">
                  <Badge className="bg-yellow-500/10 text-yellow-500">RU</Badge> Ler/Atualizar
                </div>
                <div className="flex items-center gap-1">
                  <Badge className="bg-gray-500/10 text-gray-500">R</Badge> Somente Leitura
                </div>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Perfil</TableHead>
                    <TableHead className="text-center">Obras</TableHead>
                    <TableHead className="text-center">Comercial</TableHead>
                    <TableHead className="text-center">Financeiro</TableHead>
                    <TableHead className="text-center">RH</TableHead>
                    <TableHead className="text-center">Producao</TableHead>
                    <TableHead className="text-center">Planejamento</TableHead>
                    <TableHead className="text-center">Admin</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {matrizMock.map((linha, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{linha.perfil}</TableCell>
                      <TableCell className="text-center">{getCRUDBadge(linha.obras)}</TableCell>
                      <TableCell className="text-center">{getCRUDBadge(linha.comercial)}</TableCell>
                      <TableCell className="text-center">{getCRUDBadge(linha.financeiro)}</TableCell>
                      <TableCell className="text-center">{getCRUDBadge(linha.rh)}</TableCell>
                      <TableCell className="text-center">{getCRUDBadge(linha.producao)}</TableCell>
                      <TableCell className="text-center">{getCRUDBadge(linha.planejamento)}</TableCell>
                      <TableCell className="text-center">{getCRUDBadge(linha.admin)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default function IAMPage() {
  return (
    <Suspense fallback={null}>
      <IAMContent />
    </Suspense>
  )
}
