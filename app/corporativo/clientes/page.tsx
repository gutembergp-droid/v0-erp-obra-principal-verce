"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Building2, FileText, MoreHorizontal, Eye, Pencil } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Dados mockados de clientes
const clientesMock = [
  {
    id: 1,
    razaoSocial: "DNIT - Departamento Nacional de Infraestrutura de Transportes",
    cnpj: "04.892.707/0001-00",
    tipo: "publico",
    contatos: 3,
    contratos: 5,
    status: "ativo",
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    razaoSocial: "SABESP - Companhia de Saneamento Básico do Estado de São Paulo",
    cnpj: "43.776.517/0001-80",
    tipo: "publico",
    contatos: 2,
    contratos: 3,
    status: "ativo",
    createdAt: "2024-02-20",
  },
  {
    id: 3,
    razaoSocial: "CCR Rodovias S.A.",
    cnpj: "02.846.056/0001-97",
    tipo: "privado",
    contatos: 4,
    contratos: 2,
    status: "ativo",
    createdAt: "2024-03-10",
  },
  {
    id: 4,
    razaoSocial: "Eletrobras Furnas",
    cnpj: "23.274.194/0001-19",
    tipo: "publico",
    contatos: 2,
    contratos: 4,
    status: "ativo",
    createdAt: "2024-01-05",
  },
  {
    id: 5,
    razaoSocial: "Ecorodovias Infraestrutura e Logística S.A.",
    cnpj: "04.149.454/0001-80",
    tipo: "privado",
    contatos: 3,
    contratos: 1,
    status: "ativo",
    createdAt: "2024-04-18",
  },
]

export default function ClientesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const filteredClientes = clientesMock.filter(
    (cliente) =>
      cliente.razaoSocial.toLowerCase().includes(searchTerm.toLowerCase()) || cliente.cnpj.includes(searchTerm),
  )

  return (
    <>
      <Header title="Clientes" description="Cadastro e gestão de clientes - públicos e privados" />

      <div className="p-6 space-y-6">
        {/* Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total de Clientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{clientesMock.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Públicos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500">
                {clientesMock.filter((c) => c.tipo === "publico").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Privados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">
                {clientesMock.filter((c) => c.tipo === "privado").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Contratos Ativos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{clientesMock.reduce((acc, c) => acc + c.contratos, 0)}</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabela */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <CardTitle className="text-base font-semibold">Lista de Clientes</CardTitle>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por nome ou CNPJ..."
                    className="pl-9 w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Novo Cliente
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Cadastrar Cliente</DialogTitle>
                      <DialogDescription>
                        Preencha os dados do cliente. Todos os campos são obrigatórios.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="razaoSocial">Razão Social</Label>
                        <Input id="razaoSocial" placeholder="Nome completo da empresa" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="cnpj">CNPJ</Label>
                        <Input id="cnpj" placeholder="00.000.000/0000-00" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="tipo">Classificação</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="publico">Público</SelectItem>
                            <SelectItem value="privado">Privado</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="contato">Contato Principal</Label>
                        <Input id="contato" placeholder="Nome do responsável" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="email">E-mail</Label>
                        <Input id="email" type="email" placeholder="email@empresa.com" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="telefone">Telefone</Label>
                        <Input id="telefone" placeholder="(00) 00000-0000" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Cancelar
                      </Button>
                      <Button onClick={() => setIsDialogOpen(false)}>Salvar Cliente</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Razão Social</TableHead>
                  <TableHead>CNPJ</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead className="text-center">Contatos</TableHead>
                  <TableHead className="text-center">Contratos</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClientes.map((cliente) => (
                  <TableRow key={cliente.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-muted">
                          <Building2 className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <span className="font-medium">{cliente.razaoSocial}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{cliente.cnpj}</TableCell>
                    <TableCell>
                      <Badge variant={cliente.tipo === "publico" ? "default" : "secondary"}>
                        {cliente.tipo === "publico" ? "Público" : "Privado"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">{cliente.contatos}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        {cliente.contratos}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-green-500 border-green-500">
                        Ativo
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            Visualizar
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Pencil className="w-4 h-4 mr-2" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileText className="w-4 h-4 mr-2" />
                            Ver Contratos
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
    </>
  )
}
