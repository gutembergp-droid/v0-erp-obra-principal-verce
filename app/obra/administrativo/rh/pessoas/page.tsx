"use client"

import { useState, Suspense } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { RHNav } from "@/components/rh/rh-nav"
import {
  Plus,
  Search,
  Users,
  UserCheck,
  UserX,
  Clock,
  Ban,
  Download,
  MoreHorizontal,
  Eye,
  FileText,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  Scale,
} from "lucide-react"

// ============================================
// DADOS MOCKADOS
// ============================================

const colaboradoresMock = [
  {
    id: "COL-001",
    nome: "Jose Silva Santos",
    cpf: "123.456.789-00",
    funcao: "Operador de Escavadeira",
    setor: "Producao",
    vinculo: "CLT",
    status: "Ativo",
    efetivado: true,
    docStatus: "OK",
    riscoJuridico: false,
  },
  {
    id: "COL-002",
    nome: "Maria Aparecida Costa",
    cpf: "234.567.890-11",
    funcao: "Engenheira Civil",
    setor: "Engenharia",
    vinculo: "CLT",
    status: "Ativo",
    efetivado: true,
    docStatus: "OK",
    riscoJuridico: false,
  },
  {
    id: "COL-003",
    nome: "Carlos Eduardo Lima",
    cpf: "345.678.901-22",
    funcao: "Consultor de Seguranca",
    setor: "SSMA",
    vinculo: "PJ",
    status: "Ativo",
    efetivado: true,
    docStatus: "Pendente",
    riscoJuridico: true,
  },
  {
    id: "COL-004",
    nome: "Ana Paula Ferreira",
    cpf: "456.789.012-33",
    funcao: "Motorista",
    setor: "Producao",
    vinculo: "Terceirizado",
    status: "Afastado",
    efetivado: true,
    docStatus: "OK",
    riscoJuridico: false,
  },
  {
    id: "COL-005",
    nome: "Roberto Alves Souza",
    cpf: "567.890.123-44",
    funcao: "Pedreiro",
    setor: "Producao",
    vinculo: "CLT",
    status: "Bloqueado",
    efetivado: false,
    docStatus: "Pendente",
    riscoJuridico: true,
  },
  {
    id: "COL-006",
    nome: "Fernanda Oliveira",
    cpf: "678.901.234-55",
    funcao: "Analista Administrativo",
    setor: "Administrativo",
    vinculo: "CLT",
    status: "Ferias",
    efetivado: true,
    docStatus: "OK",
    riscoJuridico: false,
  },
  {
    id: "COL-007",
    nome: "Paulo Mendes",
    cpf: "789.012.345-66",
    funcao: "Eletricista",
    setor: "Producao",
    vinculo: "Terceirizado",
    status: "Ativo",
    efetivado: true,
    docStatus: "OK",
    riscoJuridico: false,
  },
  {
    id: "COL-008",
    nome: "Juliana Santos",
    cpf: "890.123.456-77",
    funcao: "Almoxarife",
    setor: "Suprimentos",
    vinculo: "CLT",
    status: "Ativo",
    efetivado: true,
    docStatus: "OK",
    riscoJuridico: false,
  },
]

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

function PessoasContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterVinculo, setFilterVinculo] = useState("todos")
  const [filterStatus, setFilterStatus] = useState("todos")

  // Contadores
  const total = 300
  const efetivados = 285
  const pendentesEfetivacao = 15
  const afastados = 9
  const bloqueados = 6

  // Filtrar
  const colaboradoresFiltrados = colaboradoresMock.filter((c) => {
    if (searchTerm && !c.nome.toLowerCase().includes(searchTerm.toLowerCase())) return false
    if (filterVinculo !== "todos" && c.vinculo !== filterVinculo) return false
    if (filterStatus !== "todos" && c.status !== filterStatus) return false
    return true
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Ativo":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Ativo</Badge>
      case "Afastado":
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Afastado</Badge>
      case "Bloqueado":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Bloqueado</Badge>
      case "Ferias":
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Ferias</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="flex-1 flex flex-col">
      <RHNav modulo="obra" />

      <div className="flex-1 space-y-6 p-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Pessoas</h1>
              <p className="text-sm text-muted-foreground">Gestao de colaboradores da obra</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
            <Link href="/obra/administrativo/rh/pessoas/novo">
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Novo Colaborador
              </Button>
            </Link>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card className="bg-card/50">
            <CardContent className="p-4 text-center">
              <Users className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
              <p className="text-2xl font-bold">{total}</p>
              <p className="text-xs text-muted-foreground">Total</p>
            </CardContent>
          </Card>
          <Card className="bg-card/50">
            <CardContent className="p-4 text-center">
              <UserCheck className="h-5 w-5 mx-auto mb-1 text-green-500" />
              <p className="text-2xl font-bold">{efetivados}</p>
              <p className="text-xs text-muted-foreground">Efetivados</p>
            </CardContent>
          </Card>
          <Card className="bg-yellow-500/10 border-yellow-500/30">
            <CardContent className="p-4 text-center">
              <Clock className="h-5 w-5 mx-auto mb-1 text-yellow-500" />
              <p className="text-2xl font-bold text-yellow-500">{pendentesEfetivacao}</p>
              <p className="text-xs text-yellow-400">Pend. Efetivacao</p>
            </CardContent>
          </Card>
          <Card className="bg-card/50">
            <CardContent className="p-4 text-center">
              <UserX className="h-5 w-5 mx-auto mb-1 text-orange-500" />
              <p className="text-2xl font-bold">{afastados}</p>
              <p className="text-xs text-muted-foreground">Afastados</p>
            </CardContent>
          </Card>
          <Card className="bg-red-500/10 border-red-500/30">
            <CardContent className="p-4 text-center">
              <Ban className="h-5 w-5 mx-auto mb-1 text-red-500" />
              <p className="text-2xl font-bold text-red-500">{bloqueados}</p>
              <p className="text-xs text-red-400">Bloqueados</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabela */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <CardTitle className="text-base font-medium">Lista de Colaboradores</CardTitle>
              <div className="flex gap-2">
                <div className="relative w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={filterVinculo} onValueChange={setFilterVinculo}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Vinculo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="CLT">CLT</SelectItem>
                    <SelectItem value="PJ">PJ</SelectItem>
                    <SelectItem value="Terceirizado">Terceirizado</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="Ativo">Ativo</SelectItem>
                    <SelectItem value="Afastado">Afastado</SelectItem>
                    <SelectItem value="Bloqueado">Bloqueado</SelectItem>
                    <SelectItem value="Ferias">Ferias</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Funcao</TableHead>
                  <TableHead>Setor</TableHead>
                  <TableHead>Vinculo</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Docs</TableHead>
                  <TableHead className="text-center">Juridico</TableHead>
                  <TableHead className="text-right">Acoes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {colaboradoresFiltrados.map((colab) => (
                  <TableRow key={colab.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{colab.nome}</p>
                        <p className="text-xs text-muted-foreground">{colab.cpf}</p>
                      </div>
                    </TableCell>
                    <TableCell>{colab.funcao}</TableCell>
                    <TableCell>{colab.setor}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{colab.vinculo}</Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(colab.status)}</TableCell>
                    <TableCell>
                      {colab.docStatus === "OK" ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-red-500" />
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {colab.riscoJuridico && <Scale className="h-4 w-4 text-orange-500 mx-auto" />}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/obra/administrativo/rh/pessoas/${colab.id}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              Ver Prontuario
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileText className="mr-2 h-4 w-4" />
                            Documentos
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <AlertTriangle className="mr-2 h-4 w-4" />
                            Pendencias
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
      </div>
    </div>
  )
}

export default function PessoasPage() {
  return (
    <Suspense fallback={null}>
      <PessoasContent />
    </Suspense>
  )
}
