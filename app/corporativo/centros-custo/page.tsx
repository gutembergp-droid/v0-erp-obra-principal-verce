"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layout/app-layout"
import { Header } from "@/components/layout/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, FolderKanban, Building2, FileText, Upload, CheckCircle2, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Dados mockados de centros de custo
const centrosCustoMock = [
  {
    id: 1,
    codigo: "CC-2024-001",
    nome: "BR-101 Duplicação Lote 3",
    contrato: "CT-2024/001",
    cliente: "DNIT",
    moeda: "BRL",
    periodoFiscal: "2024",
    planilhaCarregada: true,
    baselineHomologada: true,
    gate1: true,
    status: "ativo",
  },
  {
    id: 2,
    codigo: "CC-2024-002",
    nome: "SES Região Metropolitana - Fase 1",
    contrato: "CT-2024/002",
    cliente: "SABESP",
    moeda: "BRL",
    periodoFiscal: "2024",
    planilhaCarregada: true,
    baselineHomologada: false,
    gate1: false,
    status: "pendente",
  },
  {
    id: 3,
    codigo: "CC-2023-089",
    nome: "UHE Belo Monte - Complementar A",
    contrato: "CT-2023/089",
    cliente: "Eletrobras Furnas",
    moeda: "BRL",
    periodoFiscal: "2023",
    planilhaCarregada: true,
    baselineHomologada: true,
    gate1: true,
    status: "ativo",
  },
  {
    id: 4,
    codigo: "CC-2024-003",
    nome: "SP-330 Restauração Trecho Norte",
    contrato: "CT-2024/003",
    cliente: "CCR Rodovias",
    moeda: "BRL",
    periodoFiscal: "2024",
    planilhaCarregada: false,
    baselineHomologada: false,
    gate1: false,
    status: "aguardando",
  },
]

export default function CentrosCustoPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCentros = centrosCustoMock.filter(
    (cc) =>
      cc.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cc.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cc.cliente.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <AppLayout>
      <Header
        title="Centros de Custo"
        description="Criação de centro de custo por obra - código único, moeda e período fiscal"
      />

      <div className="p-6 space-y-6">
        {/* Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total de CCs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{centrosCustoMock.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Gate 1 Aprovado</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">
                {centrosCustoMock.filter((cc) => cc.gate1).length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Aguardando Baseline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-500">
                {centrosCustoMock.filter((cc) => cc.planilhaCarregada && !cc.baselineHomologada).length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Sem Planilha</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">
                {centrosCustoMock.filter((cc) => !cc.planilhaCarregada).length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabela */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <CardTitle className="text-base font-semibold">Lista de Centros de Custo</CardTitle>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar CC..."
                    className="pl-9 w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Novo CC
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Nome / Obra</TableHead>
                  <TableHead>Contrato</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead className="text-center">Planilha</TableHead>
                  <TableHead className="text-center">Baseline</TableHead>
                  <TableHead className="text-center">Gate 1</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCentros.map((cc) => (
                  <TableRow key={cc.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-muted">
                          <FolderKanban className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <span className="font-mono font-medium">{cc.codigo}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{cc.nome}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <span className="font-mono text-sm">{cc.contrato}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-muted-foreground" />
                        {cc.cliente}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      {cc.planilhaCarregada ? (
                        <Badge className="bg-green-500">
                          <Upload className="w-3 h-3 mr-1" />
                          OK
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-red-500 border-red-500">
                          Pendente
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {cc.baselineHomologada ? (
                        <Badge className="bg-green-500">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Homologada
                        </Badge>
                      ) : cc.planilhaCarregada ? (
                        <Badge variant="outline" className="text-amber-500 border-amber-500">
                          Aguardando
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-muted-foreground">
                          -
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {cc.gate1 ? (
                        <Badge className="bg-primary">Liberado</Badge>
                      ) : (
                        <Badge variant="outline" className="text-muted-foreground">
                          Bloqueado
                        </Badge>
                      )}
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
                            <Upload className="w-4 h-4 mr-2" />
                            Upload Planilha
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            Ver Baseline
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
    </AppLayout>
  )
}
