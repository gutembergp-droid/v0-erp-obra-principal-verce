"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Plus,
  Search,
  FileText,
  Building2,
  Calendar,
  DollarSign,
  MoreHorizontal,
  Eye,
  Pencil,
  FolderPlus,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Dados mockados de contratos
const contratosMock = [
  {
    id: 1,
    numero: "CT-2024/001",
    cliente: "DNIT",
    objeto: "Duplicação da BR-101/RJ - Lote 3",
    valorTotal: 450000000,
    dataInicio: "2024-01-15",
    dataFim: "2027-01-15",
    obras: 2,
    status: "ativo",
    tipo: "obra",
  },
  {
    id: 2,
    numero: "CT-2024/002",
    cliente: "SABESP",
    objeto: "Sistema de Esgotamento Sanitário - Região Metropolitana",
    valorTotal: 180000000,
    dataInicio: "2024-03-01",
    dataFim: "2026-03-01",
    obras: 3,
    status: "ativo",
    tipo: "saneamento",
  },
  {
    id: 3,
    numero: "CT-2023/089",
    cliente: "Eletrobras Furnas",
    objeto: "UHE Belo Monte - Obras Complementares",
    valorTotal: 890000000,
    dataInicio: "2023-06-01",
    dataFim: "2028-06-01",
    obras: 4,
    status: "ativo",
    tipo: "energia",
  },
  {
    id: 4,
    numero: "CT-2024/003",
    cliente: "CCR Rodovias",
    objeto: "Restauração Rodoviária - SP-330",
    valorTotal: 95000000,
    dataInicio: "2024-04-01",
    dataFim: "2025-10-01",
    obras: 1,
    status: "ativo",
    tipo: "restauracao",
  },
]

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("pt-BR")
}

export default function ContratosPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredContratos = contratosMock.filter(
    (contrato) =>
      contrato.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contrato.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contrato.objeto.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const valorTotal = contratosMock.reduce((acc, c) => acc + c.valorTotal, 0)

  return (
    <>
      <Header title="Contratos" description="Gestão de contratos - valores, prazos, aditivos e documentação" />

      <div className="p-6 space-y-6">
        {/* Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total de Contratos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{contratosMock.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Valor Total Contratado</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{formatCurrency(valorTotal)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Obras Vinculadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{contratosMock.reduce((acc, c) => acc + c.obras, 0)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Ativos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500">
                {contratosMock.filter((c) => c.status === "ativo").length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabela */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <CardTitle className="text-base font-semibold">Lista de Contratos</CardTitle>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar contrato..."
                    className="pl-9 w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Contrato
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Número</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead className="max-w-[300px]">Objeto</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Período</TableHead>
                  <TableHead className="text-center">Obras</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContratos.map((contrato) => (
                  <TableRow key={contrato.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-muted">
                          <FileText className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <span className="font-mono font-medium">{contrato.numero}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-muted-foreground" />
                        {contrato.cliente}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[300px]">
                      <span className="line-clamp-1">{contrato.objeto}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-green-600 font-medium">
                        <DollarSign className="w-4 h-4" />
                        {formatCurrency(contrato.valorTotal)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {formatDate(contrato.dataInicio)} - {formatDate(contrato.dataFim)}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="secondary">{contrato.obras}</Badge>
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
                            <FolderPlus className="w-4 h-4 mr-2" />
                            Criar Centro de Custo
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
